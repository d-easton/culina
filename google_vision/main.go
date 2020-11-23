
// detectText gets text from the Vision API for an image at the given file path.
func detectTextURI(w io.Writer, file string) error {
	ctx := context.Background()

	client, err := vision.NewImageAnnotatorClient(ctx)
	if err != nil {
			return err
	}

	image := vision.NewImageFromURI(file)
	annotations, err := client.DetectTexts(ctx, image, nil, 10)
	if err != nil {
			return err
	}

	if len(annotations) == 0 {
			fmt.Fprintln(w, "No text found.")
	} else {
			fmt.Fprintln(w, "Text:")
			for _, annotation := range annotations {
					fmt.Fprintf(w, "%q\n", annotation.Description)
			}
	}

	return nil
}