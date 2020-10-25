/**
 * Culina
 * David Easton: 10/25/2020
 * 
 * 
 * Google vision OCR, text from image
 * Code borrowed from https://cloud.google.com/vision/docs/ocr#vision_text_detection_gcs-nodejs
 * 
 * Usage:
 *  - set fileName equal to string name of image file stored in input_recipe-img-upload bucket
 */ 

 
async function process() {
    // Imports the Google Cloud client libraries
    const vision = require('@google-cloud/vision');

    // Creates a client
    const client = new vision.ImageAnnotatorClient();

    const bucketName = 'input_recipe-img-upload';
    const fileName = 'maple-pecan_galette.PNG';

    // Performs text detection on the gcs file
    const [result] = await client.textDetection(`gs://${bucketName}/${fileName}`);
    const detections = result.textAnnotations;
    console.log('Text:');
    console.log(detections.length)
    detections.forEach(text => console.log(text));  
}

module.exports.run_ocr = process();



// code i did for swipesum, we can cannibalize it for OCR use

// async function process() {

//     console.log("??")
//     // Imports the Google Cloud client libraries
//     const vision = require('@google-cloud/vision').v1;

//     // Creates a client
//     const client = new vision.ImageAnnotatorClient();

//     // Bucket where the file resides
//     const bucketName = 'input-pdfs';
//     // Path to PDF file within bucket
//     const fileName = 'A1_Medical_Apr_2020.pdf';
//     // The folder to store the results
//     const outputPrefix = 'results'

//     const gcsSourceUri = `gs://${bucketName}/${fileName}`;
//     const gcsDestinationUri = `gs://${bucketName}/${outputPrefix}/`;

//     const inputConfig = {
//     // Supported mime_types are: 'application/pdf' and 'image/tiff'
//     mimeType: 'application/pdf',
//     gcsSource: {
//         uri: gcsSourceUri,
//     },
//     };
//     const outputConfig = {
//     gcsDestination: {
//         uri: gcsDestinationUri,
//     },
//     };
//     const features = [{type: 'DOCUMENT_TEXT_DETECTION'}];
//     const request = {
//     requests: [
//         {
//         inputConfig: inputConfig,
//         features: features,
//         outputConfig: outputConfig,
//         },
//     ],
//     };

//     const [operation] = await client.asyncBatchAnnotateFiles(request);
//     const [filesResponse] = await operation.promise();
//     const destinationUri =
//     filesResponse.responses[0].outputConfig.gcsDestination.uri;
//     console.log('Json saved to: ' + destinationUri);
    
// }