import { Upload } from "lucide-react";
import {useCSVReader} from "react-papaparse"
import { Button } from "@/components/ui/button";
import React from 'react'

type Props = {
    onUpload : (result:any) => void;
}

const UploadButton = ({onUpload}:Props) => {
    const {CSVReader} = useCSVReader()
  return (
    <div>
      <CSVReader onUploadAccepted = {onUpload} >
        {({getRootProps}:any) => (
            <Button 
            size='sm'
            className='w-full lg:w-auto '
            {...getRootProps()}

            >
                <Upload className=" size-4 mr-2 " />
                Import
            </Button>
        )}
      </CSVReader>
    </div>
  )
}

export default UploadButton

