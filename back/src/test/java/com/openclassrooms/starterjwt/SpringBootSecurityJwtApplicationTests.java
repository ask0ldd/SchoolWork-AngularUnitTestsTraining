package com.openclassrooms.starterjwt;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.ApplicationContext;

@SpringBootTest
public class SpringBootSecurityJwtApplicationTests {

	@Test
	public void contextLoads(ApplicationContext context) {
		Assertions.assertThat(context).isNotNull();
	}

}
