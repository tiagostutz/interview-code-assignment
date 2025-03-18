package com.fulfilment.application.monolith.stores;

import jakarta.enterprise.context.ApplicationScoped;
import java.nio.file.Files;
import java.nio.file.Path;

@ApplicationScoped
public class LegacyStoreManagerGateway {

  public void createStoreOnLegacySystem(Store store) {
    // just to emulate as this would send this to a legacy system, let's write a temp file with the
    writeToFile(store);
  }

  public void updateStoreOnLegacySystem(Store store) {
    // just to emulate as this would send this to a legacy system, let's write a temp file with the
    writeToFile(store);
  }

  private void writeToFile(Store store) {
    try {
      // Step 1: Create a temporary file
      Path tempFile;

      tempFile = Files.createTempFile(store.name, ".txt");

      System.out.println("Temporary file created at: " + tempFile.toString());

      // Step 2: Write data to the temporary file
      String content =
          "Store created. [ name ="
              + store.name
              + " ] [ items on stock ="
              + store.quantityProductsInStock
              + "]";
      Files.write(tempFile, content.getBytes());
      System.out.println("Data written to temporary file.");

      // Step 3: Optionally, read the data back to verify
      String readContent = new String(Files.readAllBytes(tempFile));
      System.out.println("Data read from temporary file: " + readContent);

      // Step 4: Delete the temporary file when done
      Files.delete(tempFile);
      System.out.println("Temporary file deleted.");

    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}
