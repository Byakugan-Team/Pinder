FROM python:3.7.3-stretch

RUN mkdir /app
WORKDIR /app
COPY . .

RUN ([ -f ./weights/resnet50.h5 ]  ) ||  wget https://storage.googleapis.com/tensorflow/keras-applications/resnet/resnet50_weights_tf_dim_ordering_tf_kernels.h5 -O './weights/resnet50.h5'

RUN ([ -f ./weights/VG19.h5 ]  ) ||  echo  '\033[0;31m---------------- Download /weights/VG19.h5 please , link : https://drive.google.com/file/d/1Sk0jIQonfxkeaybotFML1VYY-faP9lhD/view \033[0m'


RUN python -m pip install --upgrade pip
RUN pip install -r requirements.txt


CMD ["python","main.py"]
