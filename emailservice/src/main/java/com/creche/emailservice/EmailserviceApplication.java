package com.creche.emailservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = "com.creche.emailservice")
public class EmailserviceApplication {
	public static void main(String[] args) {
		SpringApplication.run(EmailserviceApplication.class, args);
	}
}
