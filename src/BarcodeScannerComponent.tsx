import React from 'react'
import { BrowserMultiFormatReader, Result } from '@zxing/library'
import Webcam from 'react-webcam'

const BarcodeScannerComponent = ({
  width,
  height,
  onUpdate,
  ...props
}: {
  width: number;
  height: number;
  onUpdate: (arg0: unknown, arg1?: Result) => void;
}): React.ReactElement => {
  const webcamRef = React.useRef(null)
  const codeReader = new BrowserMultiFormatReader()

  const capture = React.useCallback(
    () => {
      const imageSrc = webcamRef?.current?.getScreenshot()
      if (imageSrc) {
        codeReader.decodeFromImage(undefined, imageSrc).then(result => {
          onUpdate(null, result)
        }).catch((err) => {
          onUpdate(err)
        })
      }
    },
    [codeReader, onUpdate]
  )

  React.useEffect(() => {
    setInterval(capture, 100)
  }, [])

  return (
    <Webcam
      audio={false}
      width={width}
      height={height}
      ref={webcamRef}
      screenshotFormat="image/png"
      videoConstraints={{
        facingMode: 'environment'
      }}
      {...props}
    />
  )
}

export default BarcodeScannerComponent
