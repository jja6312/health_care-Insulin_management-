package store.nonghyuphealthcare;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@ComponentScan(basePackages = {"config","security","exception", "user.*", "main.*", "blood.*", "point.*", "event.*"})
@EntityScan(basePackages = {"user.entity", "event.entity"})
@EnableJpaRepositories(basePackages = {"user.repository", "blood.repository", "point.repository", "event.repository"})
public class NonghyuphealthcareApplication {

    public static void main(String[] args) {
        SpringApplication.run(NonghyuphealthcareApplication.class, args);
    }
}
