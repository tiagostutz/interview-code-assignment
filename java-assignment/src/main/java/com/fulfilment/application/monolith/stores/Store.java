package com.fulfilment.application.monolith.stores;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import jakarta.persistence.Cacheable;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;

@Entity
@Cacheable
public class Store extends PanacheEntity {

  @Column(length = 40, unique = true)
  public String name;

  public int quantityProductsInStock;

  public Store() {}

  public Store(String name) {
    this.name = name;
  }
}
