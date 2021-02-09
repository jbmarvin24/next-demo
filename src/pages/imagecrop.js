import { getCroppedImg, getRotatedImage } from '../utils/canvasUtils';
import { getOrientation } from 'get-orientation/browser';
import Cropper from 'react-easy-crop';
import { useState, useCallback } from 'react';
import { imageCropStyles } from './../styles/imageCrop';
import { Button, Typography, Slider } from '@material-ui/core';

const ORIENTATION_TO_ANGLE = {
  3: 180,
  6: 90,
  8: -90,
};

const ImageCropPage = () => {
  const classes = imageCropStyles();
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  // const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const onCropComplete = useCallback(
    async (croppedArea, croppedAreaPixels) => {
      // setCroppedAreaPixels(croppedAreaPixels);
      try {
        const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, rotation);
        console.log('donee', { croppedImage });
        setCroppedImage(croppedImage);
      } catch (e) {
        console.error(e);
      }
    },
    [imageSrc, rotation]
  );

  // const showCroppedImage = useCallback(async () => {
  //   try {
  //     const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels, rotation);
  //     console.log('donee', { croppedImage });
  //     setCroppedImage(croppedImage);
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }, [imageSrc, croppedAreaPixels, rotation]);

  const onClose = useCallback(() => {
    setCroppedImage(null);
  }, []);

  const onFileChange = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      let imageDataUrl = await readFile(file);

      // apply rotation if needed
      const orientation = await getOrientation(file);
      const rotation = ORIENTATION_TO_ANGLE[orientation];
      if (rotation) {
        imageDataUrl = await getRotatedImage(imageDataUrl, rotation);
      }

      setImageSrc(imageDataUrl);
    }
  };

  return (
    <div>
      <React.Fragment>
        <input type="file" onChange={onFileChange} accept="image/*" />
        <div className={classes.cropContainer}>
          <Cropper
            image={imageSrc}
            crop={crop}
            // rotation={rotation}
            zoom={zoom}
            aspect={4 / 4}
            onCropChange={setCrop}
            onRotationChange={setRotation}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
        <div className={classes.controls}>
          <div className={classes.sliderContainer}>
            <Typography variant="overline" classes={{ root: classes.sliderLabel }}>
              Zoom
            </Typography>
            <Slider
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              //className={{ : classes.slider }}
              onChange={(e, zoom) => setZoom(zoom)}
            />
          </div>
          {/* <div className={classes.sliderContainer}>
            <Typography variant="overline" classes={{ root: classes.sliderLabel }}>
              Rotation
            </Typography>
            <Slider
              value={rotation}
              min={0}
              max={360}
              step={1}
              aria-labelledby="Rotation"
              classes={{ container: classes.slider }}
              onChange={(e, rotation) => setRotation(rotation)}
            />
          </div> */}
          {/* <Button
            onClick={showCroppedImage}
            variant="contained"
            color="primary"
            classes={{ root: classes.cropButton }}
          >
            Show Result
          </Button> */}
        </div>
        {/* <ImgDialog img={croppedImage} onClose={onClose} /> */}

        <img
          src={croppedImage}
          alt="Cropped"
          style={{
            height: 300,
            width: 300,
            border: '5px solid rgb(255, 255, 255)',
            borderRadius: '50%',
            boxShadow: '0px 6px 5px rgb(29, 29, 29)',
            // objectFit: 'scale-down',
          }}
        />
        <img
          src={croppedImage}
          alt="Cropped"
          style={{
            height: 150,
            width: 150,
            border: '2.5px solid rgb(255, 255, 255)',
            borderRadius: '50%',
            boxShadow: '0px 6px 5px rgb(29, 29, 29)',
            // objectFit: 'scale-down',
          }}
        />
        <img
          src={croppedImage}
          alt="Cropped"
          style={{
            height: 75,
            width: 'auto',
            border: '1.25px solid rgb(255, 255, 255)',
            borderRadius: '50%',
            boxShadow: '0px 6px 5px rgb(29, 29, 29)',
            // objectFit: 'scale-down',
          }}
        />
      </React.Fragment>
    </div>
  );
};

export default ImageCropPage;

function readFile(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result), false);
    reader.readAsDataURL(file);
  });
}
