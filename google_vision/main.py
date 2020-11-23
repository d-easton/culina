import sys, os, string
# import pandas as pnd
# 1. cloud packages
from google.cloud import vision
from google.cloud import storage
from google.cloud import firestore

# 2. -- authorization and output path setup
# set up the auth credentials so we can access the OCR endpoints
os.environ['GOOGLE_APPLICATION_CREDENTIALS'] = r'culina-key.json'

# firestore document where OCR output will be tempoararily written
ocr_destination = "OCR_CACHE"

#3. Client setup
# start up clients
image_client = vision.ImageAnnotatorClient()
storage_client = storage.Client()
firestore_client = firestore.Client()


def detect_text_from_uri(uri):
    """Detects text in the file located in Google Cloud Storage or on the Web.
    """
    
    image = vision.Image()
    image.source.image_uri = uri

    response = image_client.document_text_detection(image=image)
    null_string = ''
    # texts = response.text_annotations

    # data_frame = pnd.DataFrame(columns = ['locale', 'description'])

    # 4. Output structure
    output = {
        "text_blocks": []
    }
    confidenceBreaks = {}

    # iterate down to symbol level
    pages = response.full_text_annotation.pages
    for page in pages:
        for block in page.blocks:
            # print('block confidence: ', block.confidence)
            for paragraph in block.paragraphs:
                contents = ""
                for word in paragraph.words:
                    word_text = ''.join([
                        symbol.text for symbol in word.symbols
                    ])
                    
                    if word.confidence < 0.9:
                        confidenceBreaks[word_text] = word.confidence

                    if word_text not in string.punctuation:
                        contents +=" "
                    contents += word_text

                output["text_blocks"].append(contents)
    
    if len(output["text_blocks"]) != 0:
        return output
    else:
        return 1

# def write_content_to_bucket(bucket_name, payload):
#     bucket = storage_client.bucket(bucket_name)

def write_content_to_firestore(payload, context):
    # path_parts = context.resource.split('/documents/')[1].split('/')
    print("CONTEXT CHECK IN FIRESTORE WRITE:")
    print(context.resource)
    collection_path = "culina-go-testing-upload"
    # document_path = '/'.join(path_parts[1:])
    document_path = "test-write"
    print("EXAMINE PATH: "+document_path)

    ocr_cache = firestore_client.collection(collection_path).document(document_path)
    # db.collection(u''+user_id).document(u''+ocr_destination).set(payload)

    if payload:
        print(f'Inserting payload: {payload}')
        ocr_cache.set({
            u'output': payload
        })
    # send confirmation back to client
    
def parse_image(event, context):
    print("RUN MAIN")
    output = detect_text_from_uri("null")
    write_content_to_firestore(output, context)
    


    # for text in texts:
    #     # print('\n"{}"'.format(text.description))
    #     data_frame = data_frame.append( 
    #         dict( locale=text.locale, description = text.description),
    #         ignore_index = True
    #     )

    #     # don't think we need any of this, but I'll keep it around for now just in case
    #     """
    #     vertices = (['({},{})'.format(vertex.x, vertex.y)
    #                 for vertex in text.bounding_poly.vertices])

    #     print('bounds: {}'.format(','.join(vertices)))
    #     """

    # if response.error.message:
    #     raise Exception(
    #         '{}\nFor more info on error messages, check: '
    #         'https://cloud.google.com/apis/design/errors'.format(
    #             response.error.message))
    # else:
    #     return data_frame

# if __name__ == "__main__":
#     print(sys.argv[0])
#     bucket_name = "recipe_storage"
#     print( detect_text_from_uri(sys.argv[1]) )