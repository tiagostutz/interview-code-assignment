package com.fulfilment.application.monolith.warehouses.adapters.restapi;

import static io.restassured.RestAssured.given;
import static org.hamcrest.CoreMatchers.containsString;

import io.quarkus.test.junit.QuarkusIntegrationTest;
import org.junit.jupiter.api.Test;

@QuarkusIntegrationTest
public class WarehouseEndpointIT {

  @Test
  public void testSimpleListWarehouses() {

    final String path = "warehouse";

    // List all, should have all 3 products the database has initially:
    given()
        .when()
        .get(path)
        .then()
        .statusCode(200)
        .body(containsString("MWH.001"), containsString("MWH.012"), containsString("MWH.023"));
  }

  @Test
  public void testSimpleCheckingArchivingWarehouses() {

    // Uncomment the following lines to test the WarehouseResourceImpl implementation

    // final String path = "warehouse";

    // List all, should have all 3 products the database has initially:
    // given()
    //     .when()
    //     .get(path)
    //     .then()
    //     .statusCode(200)
    //     .body(
    //         containsString("MWH.001"),
    //         containsString("MWH.012"),
    //         containsString("MWH.023"),
    //         containsString("ZWOLLE-001"),
    //         containsString("AMSTERDAM-001"),
    //         containsString("TILBURG-001"));

    // // Archive the ZWOLLE-001:
    // given().when().delete(path + "/1").then().statusCode(204);

    // // List all, ZWOLLE-001 should be missing now:
    // given()
    //     .when()
    //     .get(path)
    //     .then()
    //     .statusCode(200)
    //     .body(
    //         not(containsString("ZWOLLE-001")),
    //         containsString("AMSTERDAM-001"),
    //         containsString("TILBURG-001"));
  }
}
