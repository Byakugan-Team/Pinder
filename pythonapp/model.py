import numpy as np

#Keras Libary
from keras.preprocessing import image                  
from keras.applications.resnet50 import ResNet50,preprocess_input, decode_predictions
from keras.preprocessing.image import img_to_array
from keras.applications.vgg19 import VGG19
#Resnet50 Model
ResNet50_model = ResNet50(weights='./weights/resnet50.h5')

#VG19 Model
VG19_model = VGG19(weights='./weights/VG19.h5')


def process_image(img_path):


    imageArray = img_to_array(img_path)
    imageArray = imageArray.reshape((1, imageArray.shape[0], imageArray.shape[1], imageArray.shape[2]))

    return preprocess_input(imageArray)

def predict_class(img_path):

    loaded_image = image.load_img(img_path, target_size=(224, 224))
    Procecced_image = process_image(loaded_image)

    result = VG19_model.predict(Procecced_image)

    label = decode_predictions(result)

    label = label[0][0]
    prediction = label[1]
    percentage = '%.2f%%' % (label[2]*100)

    return prediction, percentage


def Expand_Photo_dims(img_path):

        img = image.load_img(img_path, target_size=(224, 224))
        x = image.img_to_array(img)
        result = np.expand_dims(x, axis=0)
        return result


def ResNet50_predict_labels(img_path):
    image_loaded = preprocess_input(Expand_Photo_dims(img_path))
    return ResNet50_model.predict(image_loaded)


def Pet_Detector(img_path):
    prediction = ResNet50_predict_labels(img_path)
    IDMaxLabel = np.argmax(prediction)
    code , resnetlabel , resnetPercentage = decode_predictions(prediction , top=1)[0][0]
    label , percentage  = predict_class(img_path)
    print('----------* resnet50 *--------',resnetlabel)

    #Dog
    if(((IDMaxLabel <= 268) & (IDMaxLabel >= 151)) ):
        return {"Pet":'Dog' , "label":label.replace('_',' ')}

    #Cat
    elif (((IDMaxLabel <= 285) & (IDMaxLabel >= 281)) ):
        return {"Pet":'Cat' , "label":label.replace('_',' ')}

    #Frog
    elif (((IDMaxLabel <= 32) & (IDMaxLabel >= 30)) ):
        return {"Pet":'Frog' , "label":label.replace('_',' ')}

    #Turtle
    elif (((IDMaxLabel <= 37) & (IDMaxLabel >= 33)) ):
        return {"Pet":'Turtle' , "label":label.replace('_',' ')}

    #Bird
    elif (((IDMaxLabel <= 100) & (IDMaxLabel >= 80)) ):
        return {"Pet":'Bird' , "label":label.replace('_',' ')}

    #Monkey
    elif (((IDMaxLabel <= 382) & (IDMaxLabel >= 365)) ):
        return {"Pet":'Monkey' , "label":label.replace('_',' ')}
    
    #Fish
    elif (((IDMaxLabel <= 397) & (IDMaxLabel >= 389)) ):
        return {"Pet":'Fish' , "label":label.replace('_',' ')}


    #Crab
    elif (((IDMaxLabel <= 121) & (IDMaxLabel >= 118)) ):
        return {"Pet":'Crab' , "label":label.replace('_',' ')}

    #Insect
    elif (((IDMaxLabel <= 319) & (IDMaxLabel >= 300)) ):
        return {"Pet":'Insect' , "label":label.replace('_',' ')}

    else:
        return {"Pet":'unknown' , "label":label.replace('_',' ')}
