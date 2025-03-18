# Code Assignment

Your assignment is to implement some missing pieces on this code base and answer some small questions about possible changes and improvements on code. Those tasks are listed below. The questions can be answered in the [QUESTIONS](QUESTIONS.md) file.

This assignment should not take too long. We are not expecting you to expend an entire day or a whole weekend on this to be completed, but with the help of an AI assistant, usually this can be done in around 4 hours by a senior 🤖

Some parts of the code contain methods that are already defined but currently throw `UnsupportedOperationException`. Other methods are implemented but incomplete, and there may be some missing pieces. Your goal is to fill in all these gaps, ensuring the code works correctly with all the specified endpoints, while respecting the constraints and validations outlined in this file.

Also, just a minimum set of tests are present, feel free to bring more as well to craft the tests related to the implementations you will work on.

**Before starting the tasks, it is important to [read the brief overview](BRIEFING.md) that provides essential information about the domain, entities, business rules, and other relevant details.**

## Tasks

### 1. Location (Must have)

> this code is located under package `com.fulfilment.application.monolith.location`

On the class `LocationGateway`, implement the method `resolveByIdentifier`. We advise you to start by this one as this is the most simple and is a pre-requirement for the next tasks. This is just a warm-up task 😃

### 2. Store (Must have)

> this code is located under package `com.fulfilment.application.monolith.stores`

Adjust the `StoreResource` operations to make sure that the `LegacyStoreManagerGateway` calls that happens there take place after the changes **are commited to the database**, to guarantee that the downstream legacy system is receiving a confirmed data from us.

If you check the `StoreResource` class and methods, you'll notice that it uses `LegacyStoreManagerGateway` instance. This is simulating an integration with a legacy system with which we are syncing the `Stores` register handled by our system. Although the initial implementation is working properly, we need an implementation that **guarantees** that the change to the `Store` entity is propagated only after it is effectively stored in our database.

### 3. Warehouse (Must have)

> this code is located under package `com.fulfilment.application.monolith.warehouse`

#### Implement Warehouse Creation, Replacement and Archive logic (Must have)

Locate and implement the API endpoints handlers and Use Cases for all Warehouse related operations, like creating, retrieveing, replacing and archiving. 

The following validations and constraints should be applied and a proper response should be returned to the users:

**Business Unit Code Verification**

Ensure that the specified business unit code for the warehouse doesn't already exists.

**Location Validation**

Confirm that the warehouse location is valid, meaning it must be an existing valid location.

**Warehouse Creation Feasibility**

Check if a new warehouse can be created at the specified location or if the maximum number of warehouses has already been reached.

**Capacity and Stock Validation** 

Validate the warehouse capacity, ensuring it does not exceed the maximum capacity associated with the location and that it can handle the stock informed.

#### Additional Validations for Replacing a Warehouse

**Capacity Accommodation**

Ensure the new warehouse's capacity can accommodate the stock from the warehouse being replaced.

**Stock Matching**

Confirm that the stock of the new warehouse matches the stock of the previous warehouse.

## BONUS task (nice to have)

Implement the feature of associating `Warehouses` as fullfilment units of certain `Products` to determined `Stores`.

Constraints:

1. Each `Product` can be fulfilled by a maximum of 2 different `Warehouses` per `Store`

2. Each `Store` can be fulfilled by a maximum of 3 different `Warehouses`

3. Each `Warehouse` can store maximally 5 types of `Products`