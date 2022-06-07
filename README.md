# Unreal Math Operator

## Description 

I am a huge of the magic created everyday by mathematical dilemmas and aspects. In fact I was so stoned with the idea of the Fibonnaci sequence and its manifesataion in all the universe

So for the Software testing and the devops lab, i decided to create a nest application that performs some of the most stunning mathematical operations in order to test this application and try to deploy it 

## Technologies
* Nestjs : development technology
* mysql : database
* Jest : for unit and end to end testing
* Docker: for the containerization of the application
* Git / Github : for version control and definition of the pipeline
* AWS : as the host cloud provider 

## CI / CD pipeline
The pipeline for this repository is composed of two jobs: 
* **Testing**: this job pulls the source code from github into a ubuntu machine , install deps and run the needed runs the created tests (unit and e2e tests)
* **Deployment**: this job does the following:
    * connects to an EC2 instance 
    * stops the containers if they are working
    * removes the old version of the code 
    * clone the newer version of the code
    * creates .env file with the needed env 
    * creates the containers needed with docker compose

## DISCLAIMER
The application is missing a lot of features and it is open for improvement. Who knows maybe i ll finish developping the rest of the desired features in the future

## Note for Mr Wassim
* The main application is in the folder backed there you can find a readme file that will explain the testing code i implemented and the location of each test script is provided inn more details under the src directory there