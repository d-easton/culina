 
package ocr

import (
        "context"
        "fmt"
        "log"
)

// ProcessImage is executed when a file is uploaded to the Cloud Storage bucket you
// created for uploading images. It runs detectText, which processes the image for text.
func ProcessImage(ctx context.Context, event GCSEvent) error {
        if err := setup(ctx); err != nil {
                return fmt.Errorf("ProcessImage: %v", err)
        }
        if event.Bucket == "" {
                return fmt.Errorf("empty file.Bucket")
        }
        if event.Name == "" {
                return fmt.Errorf("empty file.Name")
        }
        if err := detectText(ctx, event.Bucket, event.Name); err != nil {
                return fmt.Errorf("detectText: %v", err)
        }
        log.Printf("File %s processed.", event.Name)
        return nil
}