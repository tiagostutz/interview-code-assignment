package com.fulfilment.application.monolith.warehouses.domain.ports;

import com.fulfilment.application.monolith.warehouses.domain.models.Warehouse;

public interface ReplaceWarehouseOperation {
  void replace(Warehouse warehouse);
}
