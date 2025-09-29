package com.cursoIntegrador.lePettiteCoffe;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication // (exclude = { DataSourceAutoConfiguration.class }) // LA ANOTACION ES TEMPORAL
						// HASTA TENER BD
public class LePettiteCoffeApplication {

	public static void main(String[] args) {
		SpringApplication.run(LePettiteCoffeApplication.class, args);
	}

}
