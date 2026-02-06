import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/Button";
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Upload as UploadIcon, FileText, Image, AlertCircle, X, CheckCircle } from "lucide-react";
import { useAuth } from "../context/AuthContext";
// import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";

export const UploadPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation("static");
  const { user } = useAuth();
  // const { toast } = useToast();

  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false); // for file dragging
  const [errorDialog, setErrorDialog] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  // file validation
  const validTypes = [
    "application/pdf",
    "image/jpeg",
    "image/png",
    "image/webp",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain"
  ];

  // 10MB max size
  const maxSize = 10 * 1024 * 1024; // 10MB

  // drag and drop handlers
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  // drag leave handler
  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  // validate file type and size for check file validation
  const validateFile = (file) => {

    // check file type
    if (!validTypes.includes(file.type)) {
      setErrorMessage("Sirf PDF ya image (JPG, PNG) upload kare");
      setErrorDialog(true);
      return false;
    }

    // check file size
    if (file.size > maxSize) {
      setErrorMessage("File 10MB se chhoti honi chahiye");
      setErrorDialog(true);
      return false;
    }

    return true;
  };

  // file dropped handler
  const handleDrop = useCallback((e) => {

    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0]; // find file by drag and drop method

    // validate file
    if (droppedFile && validateFile(droppedFile)) {
      setFile(droppedFile); // set file in event
    }
  }, []);

  // file added via file input
  const handleFileChange = (e) => {
    // file selected
    const selectedFile = e.target.files && e.target.files[0]; // find file by input

    // validate file
    if (selectedFile && validateFile(selectedFile)) {
      setFile(selectedFile); // set file in state
    }
  };

  // upload file to server
  const handleUpload = async () => {

    // check file or user yes or not
    if (!file || !user) {
      navigate("/auth"); // redirect login if file not
      return;
    }

    setUploading(true); // loading true when file available

    try {
      const token = localStorage.getItem("token"); // find token from local storage
      console.log(token);

      const formData = new FormData(); // create new formData instance
      formData.append("file", file); //  append upload file data in formdata with name of file

      // 1️⃣ Upload file
      const uploadRes = await fetch("http://localhost:5000/api/form/upload",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        }
      );

      const uploadData = await uploadRes.json();
      console.log(uploadData);

      // check if uploadData response
      if (!uploadRes.ok || !uploadData.success) {
        throw new Error(uploadData.message || "Upload failed");
      }

      // upload data by id
      const formId = uploadData.formId;
      
      // 2️⃣ Trigger OCR
      await fetch(`http://localhost:5000/api/form/${formId}/ocr`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}`, },
        }
      );

      // toast({
      //   title: "Upload Successful",
      //   description: "OCR processing complete. Result ready!",
      // });

      // 3️⃣ Go to Result page
      navigate(`/result?id=${formId}`);
    }
    catch (err) {
      // toast({
      //   title: "Upload Failed",
      //   description: err.message || "Dobara try karein",
      //   variant: "destructive",
      // });
    }
    finally {
      setUploading(false);
    }
  };

  // remove selected file
  const removeFile = () => setFile(null);

  return (
    <>
      <section className="py-12 md:py-20">
        <div className="max-w-xl mx-auto">

          <div className="mb-8 text-center">
            <h1 className="mb-2 text-2xl font-bold md:text-3xl">Upload Your Form</h1>
            <p className="text-muted-foreground">Upload a PDF or image — AI will explain it</p>
          </div>

          <div className={`relative rounded-2xl border-2 border-dashed p-8 text-center transition-all ${isDragging
            ? "border-primary bg-primary/5"
            : file
              ? "border-success bg-success/5"
              : "border-border bg-card hover:border-primary/50"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {!file ? (
              <>
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-2xl bg-primary/10">
                  <UploadIcon className="w-8 h-8 text-primary" />
                </div>

                <p className="mb-2 font-medium">
                  {isDragging
                    ? "Drop it here"
                    : "Drag your file here or click to upload"
                  }
                </p>

                <p className="mb-6 text-sm text-muted-foreground">
                  PDF, JPG, PNG • Max 10MB
                </p>

                <label className="relative inline-block cursor-pointer" htmlFor="upload">
                  <input
                    type="file"
                    id="upload"
                    className="absolute invisible w-full h-full opacity-0"
                    accept=".pdf,.jpg,.jpeg,.png,.webp"
                    onChange={handleFileChange}
                  />
                  <span class="inline-flex items-center justify-center bg-primary gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground h-11 px-6 py-2">
                    <UploadIcon className="inline-block w-4 h-4 mr-2" />
                    Choose File
                  </span>
                </label>

                <div className="flex justify-center gap-4 mt-6 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <FileText className="w-4 h-4" /> PDF
                  </div>
                  <div className="flex items-center gap-1">
                    <Image className="w-4 h-4" /> JPG/PNG
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-2xl bg-success/10">
                  <CheckCircle className="w-8 h-8 text-success" />
                </div>

                <p className="mb-1 font-medium">
                  File selected!
                </p>
                <p className="mb-4 text-sm text-muted-foreground">
                  {file.name}
                </p>

                <button
                  onClick={removeFile}
                  className="inline-flex items-center gap-1 text-sm hover:text-destructive"
                >
                  <X className="w-4 h-4" />
                  Remove
                </button>
              </>
            )}
          </div>

          {/* explore button */}
          <div className="mt-6">
            <Button
              variant="primary"
              size="lg"
              className="w-full"
              disabled={!file || uploading}
              loading={uploading}
              onClick={handleUpload}
            >
              {user ? "Explain Now" : "Login to Continue"}
            </Button>
          </div>

          {/* notes */}
          <p className="mt-4 text-xs text-center text-muted-foreground">
            Your file is secure. It will only be used for explanation.
          </p>
        </div>
      </section>

      {/* error dialog */}
      {/* <Dialog open={errorDialog} onOpenChange={setErrorDialog}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-destructive/10">
              <AlertCircle className="w-6 h-6 text-destructive" />
            </div>
            <DialogTitle className="text-center">
              {t("upload.errors.invalidFileTitle")}
            </DialogTitle>
            <DialogDescription className="text-center">
              {errorMessage}
            </DialogDescription>
          </DialogHeader>

          <Button onClick={() => setErrorDialog(false)} className="w-full">
            {t("errors.retry")}
          </Button>
        </DialogContent>
      </Dialog> */}
    </>
  );
};
