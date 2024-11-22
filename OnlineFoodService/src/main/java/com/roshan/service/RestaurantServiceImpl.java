package com.roshan.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.handler.UserRoleAuthorizationInterceptor;

import com.roshan.dto.RestaurantDTO;
import com.roshan.entity.Address;
import com.roshan.entity.Restaurant;
import com.roshan.entity.Users;
import com.roshan.repo.IRestaurantRepo;
import com.roshan.repo.IUserRepo;
import com.roshan.request.CreateRestaurantRequest;
import com.roshan.response.IAddressRepository;

@Service
public class RestaurantServiceImpl implements IRestaurantService {

	@Autowired
	IUserRepo userRepo;
	@Autowired
	private IRestaurantRepo restaurantRepo;
	@Autowired
	private IAddressRepository addressRepo;
	@Autowired
	IUserService userService;

	@Override
	public RestaurantDTO addToFavorites(Long restaurantId, Users user) throws Exception {
		Restaurant restaurant = findRestaurantById(restaurantId);
		RestaurantDTO dto = new RestaurantDTO();
		dto.setDescription(restaurant.getDescription());
		dto.setImages(restaurant.getImages());
		dto.setTitle(restaurant.getName());
		dto.setId(restaurantId);
		boolean isFavorite = false;
		List<RestaurantDTO> favorites = user.getFavorites();
		for (RestaurantDTO favorite : favorites) {
			if (favorite.getId().equals(restaurantId)) {
				isFavorite = true;
			}
		}
		if (isFavorite) {
			favorites.removeIf(favorite -> favorite.getId().equals(restaurantId));
		} else {
			favorites.add(dto);
		}
		userRepo.save(user);
		return dto;
	}

	@Override
	public Restaurant createRestaurant(CreateRestaurantRequest req, Users user) {

		Address address = addressRepo.save(req.getAddress());

		Restaurant restaurant = new Restaurant();
		restaurant.setAddress(address);
		restaurant.setContactInformation(req.getContactInformation());
		restaurant.setCuisineType(req.getCuisineType());
		restaurant.setDescription(req.getDescription());
		restaurant.setImages(req.getImages());
		restaurant.setName(req.getName());
		restaurant.setOpeningHours(req.getOpeningHours());
		restaurant.setRegistrationDate(LocalDateTime.now());
		restaurant.setOwner(user);

		return restaurantRepo.save(restaurant);
	}

	@Override
	public Restaurant updateRestaurant(Long restaurantId, CreateRestaurantRequest updatedRestaurant) throws Exception {
		Restaurant restaurant = findRestaurantById(restaurantId);
		if (restaurant.getCuisineType() != null) {
			restaurant.setCuisineType(updatedRestaurant.getCuisineType());

		}
		if (restaurant.getDescription() != null) {
			restaurant.setDescription(updatedRestaurant.getDescription());
		}
		if (restaurant.getName() != null) {
			restaurant.setName(updatedRestaurant.getName());
		}
		return restaurantRepo.save(restaurant);
	}

	@Override
	public void deleteRestaurant(Long restaurantId) throws Exception {
		Restaurant restaurant = findRestaurantById(restaurantId);
		restaurantRepo.delete(restaurant);

	}

	@Override
	public List<Restaurant> getAllRestaurants() {
		return restaurantRepo.findAll();
	}

	@Override
	public List<Restaurant> searchRestaurant(String keyword) {
		return restaurantRepo.findBySearchQuery(keyword);
	}

	@Override
	public Restaurant findRestaurantById(Long id) throws Exception {
		Optional<Restaurant> opt = restaurantRepo.findById(id);
		if (opt.isEmpty()) {
			throw new Exception("Restaurant not found with id : " + id);
		}
		return opt.get();
	}

	@Override
	public Restaurant getRestaurantByUserId(Long userId) throws Exception {
		Restaurant restaurant = restaurantRepo.findByOwnerId(userId);
		if (restaurant == null) {
			throw new Exception("Restaurant not found with owner id : " + userId);
		}
		return restaurant;
	}

	@Override
	public Restaurant updateRestaurantStatus(Long id) throws Exception {
		Restaurant restaurant = findRestaurantById(id);
		restaurant.setOpen(!restaurant.isOpen());
		return restaurantRepo.save(restaurant);
	}
}
