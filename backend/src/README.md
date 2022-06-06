# Test scripts locations and test cases 

**1- Unit Test**: 

* For the fibonacci functionality you may found under the main directory a sript called fibonacci.service.spec.ts that tests the service for a positive, 0 and negative value (I am still looking to find how to expect exception)

* For the quadratic form resolver: you may find under the same directory a script named secondDegree.service.spec.ts where i am testing the service's return value for the cases where delta is either negative, null or positive

* For the login functionality: a mock to the UserService responsible for accessing the database was created (under the user/\__mocks__ directory) to return a user stub (defined next to the scrip t of test). than a script for testing the login service was created under authentification/service directory 

=> with jest i am still facing an issue with expecting an error of some form (Unauthorized or BadRequest)

=> Update : Fixed the issue with the exceptions

**2- Integration / end to end test**

* Since the application doesn't contain much interaction between services, there is no necessity or meaning in creating integrations tests

* With the above being said, only end to end tests where implemented. for each endpoint there is a test suit that all can be found in the test directory at the same level as the src directory


