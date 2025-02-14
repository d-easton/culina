
package ocr

import (
        "context"
        "encoding/json"
        "fmt"
        "log"

        "cloud.google.com/go/pubsub"
        "cloud.google.com/go/translate"
)

// TranslateText is executed when a message is published to the Cloud Pub/Sub
// topic specified by the TRANSLATE_TOPIC environment variable, and translates
// the text using the Google Translate API.
func TranslateText(ctx context.Context, event PubSubMessage) error {
        if err := setup(ctx); err != nil {
                return fmt.Errorf("setup: %v", err)
        }
        if event.Data == nil {
                return fmt.Errorf("empty data")
        }
        var message ocrMessage
        if err := json.Unmarshal(event.Data, &message); err != nil {
                return fmt.Errorf("json.Unmarshal: %v", err)
        }

        log.Printf("Translating text into %s.", message.Lang.String())
        opts := translate.Options{
                Source: message.SrcLang,
        }
        translateResponse, err := translateClient.Translate(ctx, []string{message.Text}, message.Lang, &opts)
        if err != nil {
                return fmt.Errorf("Translate: %v", err)
        }
        if len(translateResponse) == 0 {
                return fmt.Errorf("Empty Translate response")
        }
        translatedText := translateResponse[0]

        messageData, err := json.Marshal(ocrMessage{
                Text:     translatedText.Text,
                FileName: message.FileName,
                Lang:     message.Lang,
                SrcLang:  message.SrcLang,
        })
        if err != nil {
                return fmt.Errorf("json.Marshal: %v", err)
        }

        topic := pubsubClient.Topic(resultTopic)
        ok, err := topic.Exists(ctx)
        if err != nil {
                return fmt.Errorf("Exists: %v", err)
        }
        if !ok {
                topic, err = pubsubClient.CreateTopic(ctx, resultTopic)
                if err != nil {
                        return fmt.Errorf("CreateTopic: %v", err)
                }
        }
        msg := &pubsub.Message{
                Data: messageData,
        }
        if _, err = topic.Publish(ctx, msg).Get(ctx); err != nil {
                return fmt.Errorf("Get: %v", err)
        }
        log.Printf("Sent translation: %q", translatedText.Text)
        return nil
}