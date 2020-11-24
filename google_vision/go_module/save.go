
package ocr

import (
        "context"
        "encoding/json"
        "fmt"
        "log"
)

// SaveResult is executed when a message is published to the Cloud Pub/Sub topic
// specified by the RESULT_TOPIC environment vairable, and saves the data packet
// to a file in GCS.
func SaveResult(ctx context.Context, event PubSubMessage) error {
        if err := setup(ctx); err != nil {
                return fmt.Errorf("ProcessImage: %v", err)
        }
        var message ocrMessage
        if event.Data == nil {
                return fmt.Errorf("Empty data")
        }
        if err := json.Unmarshal(event.Data, &message); err != nil {
                return fmt.Errorf("json.Unmarshal: %v", err)
        }
        log.Printf("Received request to save file %q.", message.FileName)

        resultFilename := fmt.Sprintf("%s_%s.txt", message.FileName, message.Lang)
        bucket := storageClient.Bucket(resultBucket)

        log.Printf("Saving result to %q in bucket %q.", resultFilename, resultBucket)

        w := bucket.Object(resultFilename).NewWriter(ctx)
        defer w.Close()
        fmt.Fprint(w, message.Text)

        log.Printf("File saved.")
        return nil
}