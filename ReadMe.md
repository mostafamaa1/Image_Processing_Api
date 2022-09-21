# IMAGE PROCESSING API

## Introduction

This is an image processing API Project. Images can be queried and resized within the browser. 

To access the images, navigate to localhost:3000/api and enter the valid parameters to see the image resized in the browser. 

Once the image is resized, a copy will be created in the thumb folder in your local directory.


## Getting Started

The project can be built and run in the following ways

### 1. Install all dependencies

`npm i`

### 2. Build

`npm run build`

This command will build the typeScript code into JavaScript and save them in the `./build` folder.

### 3. Start the Server after Build

`npm run start` (For Development)
 AND 
`npm run start:prod` (For Production)

This command will start the server running on port `3000`.

* -> Check `Package.json` for information.

## Testing and Linting

Here, I will show you how to run the test and also how to check that our code respects all the eslint rules.

### 1. Formating and Linting

`npm run format`

This script contains formating and linting the application.

### 2. Testing

`npm run test`

This script builds the application and runs testing using jasmine.

## Endpoint

### `/api/image?filename=<image_name>&width=<image_width>&height=<image_height>`

* -> Method: `get`
* -> URL Params: `height` and `width` - the height or width of the image in pixels
* -> Query Param: `filename` - the specific image you are requesting.
* -> You can find the Images list using GET `/api/imageslist` as a JSON result

    For example: `localhost:3000/api/image?filename=fjord&width=800&height=400`

#### Available Image options

1. `encenadaport`
2. `fjord`
3. `icelandwaterfall`
4. `palmtunnel`
5. `santamonica`

### Functionality

* -> User can query api endpoint using various parameters and queries to retrieve an image with a specified height and width.
* -> All images requested will be saved to local disk.
* -> If a user requested an image that has already been created, the previously cached image will be returned.
* -> Entering incorrect parameters will not be processed and error message will apear to user

## Technologies Used

- [NodeJS](https://nodejs.org/en/) - The JavaScript runtime.
- [Express](https://expressjs.com/) - The web framework.
- [TypeScript](https://www.typescriptlang.org/) - The language used.
- [Jasmine](https://jasmine.github.io/) - The Testing framework used.
- [Sharp](https://sharp.pixelplumbing.com/) - NodeJS image processor.

### Created By Mostafa Ahmed
