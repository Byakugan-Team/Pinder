from flask import Flask, render_template, request
from flask_uploads import UploadSet, configure_uploads, IMAGES
from keras.preprocessing.image import load_img

# Import Predection function
from model import Pet_Detector


# Flask Configuration
app = Flask(__name__)
photos = UploadSet('photos', IMAGES)
app.config['UPLOADED_PHOTOS_DEST'] = './images'
configure_uploads(app, photos)




@app.route('/Pinder_Pet_Prediction', methods=[ 'POST'])
def upload():
    if request.method == 'POST' and 'photo' in request.files:
        filename = photos.save(request.files['photo'])
        prediction = Pet_Detector('./images/'+filename)
        
        prediction['photoUrl'] = request.host_url+'images/'+filename
        return prediction
    # web page to show before the POST request containing the image
    return {'success':'false','error':'Upload a Photo Please'}


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
