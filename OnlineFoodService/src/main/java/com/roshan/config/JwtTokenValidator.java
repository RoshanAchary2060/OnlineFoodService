package com.roshan.config;

import com.roshan.entity.CustomUserDetails;
import com.roshan.entity.Users;
import com.roshan.repo.IUserRepo;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.crypto.SecretKey;
import java.io.IOException;
import java.util.List;

@RequiredArgsConstructor
public class JwtTokenValidator extends OncePerRequestFilter {

    private final IUserRepo userRepo;
//    @Override
//    protected void doFilterInternal(HttpServletRequest request, @NonNull HttpServletResponse response,@NonNull FilterChain filterChain)
//            throws ServletException, IOException {
//
//        String jwt = request.getHeader(JwtConstant.JWT_HEADER);
//        if (jwt != null) {
//            jwt = jwt.substring(7);
//            try {
//                SecretKey key = Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());
//                Claims claims = Jwts.parser().verifyWith(key).build().parseSignedClaims(jwt).getPayload();
//                String email = String.valueOf(claims.get("email"));
//                String authorities = String.valueOf(claims.get("authorities"));
//
//                List<GrantedAuthority> auth = AuthorityUtils.commaSeparatedStringToAuthorityList(authorities);
//                Authentication authentication = new UsernamePasswordAuthenticationToken(email, null, auth);
//                SecurityContextHolder.getContext().setAuthentication(authentication);
//
//            } catch (Exception ex) {
//                throw new BadCredentialsException("Invalid token...");
//            }
//        }
//        filterChain.doFilter(request, response);
//    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain) throws ServletException, IOException {

        String jwt = request.getHeader(JwtConstant.JWT_HEADER);
        if (jwt != null && jwt.startsWith("Bearer ")) {
            jwt = jwt.substring(7);  // Remove "Bearer " prefix
            try {
                SecretKey key = Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());
                Claims claims = Jwts.parser().verifyWith(key).build().parseSignedClaims(jwt).getPayload();

                String email = String.valueOf(claims.get("email"));
                String authorities = String.valueOf(claims.get("authorities"));

                // 👉 Load the full user entity from DB
                Users user = userRepo.findByEmail(email);
                if (user == null) {
                    throw new UsernameNotFoundException("User not found");
                }

                List<GrantedAuthority> auth = AuthorityUtils.commaSeparatedStringToAuthorityList(authorities);

                // 👉 Create CustomUserDetails with ID and other fields
                CustomUserDetails userDetails = new CustomUserDetails(
                        user.getId(),
                        user.getEmail(),
                        user.getPassword(),
                        auth
                );

                Authentication authentication = new UsernamePasswordAuthenticationToken(userDetails, null, auth);
                SecurityContextHolder.getContext().setAuthentication(authentication);

            } catch (Exception ex) {
                throw new BadCredentialsException("Invalid token...");
            }
        }

        filterChain.doFilter(request, response);
    }

}
