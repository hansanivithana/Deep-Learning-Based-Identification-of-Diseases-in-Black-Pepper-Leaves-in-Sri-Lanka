# BlackPepperLeavesDiseases

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.8.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

-----------------------------------------------------------------------------------------------------------------------------------------------------

# Deep Learning-Based Identification of Diseases in Black Pepper Leaves in Sri Lanka

A deep-learning-based web application for identifying black pepper leaf diseases and classifying disease severity stages using field images collected under Sri Lankan farm conditions.

---

## Overview

Black pepper (*Piper nigrum* L.) is an economically important spice crop in Sri Lanka. Diseases affecting black pepper can reduce plant health and crop productivity, while visually similar symptoms can make manual identification difficult.

This project investigates the use of deep learning and image processing to identify diseases from individual black pepper leaf images. The system focuses on six black pepper diseases and a healthy-leaf class, with further classification of diseased leaves into three severity stages.

The trained MobileNetV2 models are integrated into a web-based system where users can upload a black pepper leaf image and receive the predicted disease and, where applicable, its severity stage.

> **Scope:** The system performs visual classification of individual black pepper leaf images. It is intended as a decision-support prototype and should not be considered a complete plant-level diagnosis or a quantitative measurement of disease severity.

---

## Key Features

### 🌿 Leaf Disease Prediction

Users can upload an image of a black pepper leaf to obtain an AI-based prediction.

The system:

* Accepts a black pepper leaf image through the web interface.
* Validates the uploaded image.
* Preprocesses the image before inference.
* Uses the trained deep learning model for prediction.
* Identifies the predicted disease or healthy condition.
* Displays the predicted disease name to the user.
* For diseased leaves, displays the corresponding severity stage.
* Displays the prediction confidence returned by the model.
* Presents the prediction result through the web interface.

### 📊 Disease and Severity Information

Based on the prediction, the system provides relevant information associated with the detected condition, such as:

* Predicted disease name
* Detected severity stage
* Description of the predicted condition
* Relevant disease information
* Severity-stage information
* Treatment or management recommendations, where available

### 🔐 User Authentication

The system includes user authentication to provide role-based access to the application.

Authentication-related functionality includes:

* User registration
* User login
* Password protection
* Authentication using JWT
* Role-based access
* Secure password storage using bcrypt

### 👥 User Roles

The system is designed to support different categories of users involved in black pepper cultivation and disease management.

#### 👨‍🌾 Farmers

Farmers can use the system to:

* Upload black pepper leaf images.
* Obtain disease predictions.
* View the predicted disease name.
* View the corresponding severity stage.
* View available disease and treatment information.
* Use the prediction as decision-support information when monitoring their crops.

#### 👨‍🔬 Agricultural Officers

Agricultural officers can use the system to:

* Analyse uploaded black pepper leaf images.
* View predicted disease conditions and severity stages.
* Access disease-related information.
* Support field-level disease identification and monitoring.
* Use the system as an additional decision-support tool when assisting farmers.

#### 👤 System Administrators

Administrators can manage system-related information and users, depending on the implemented access permissions.

Administrative functions may include:

* User management
* Managing disease-related information
* Managing treatment or recommendation information
* Monitoring application data
* Maintaining system information

> The exact permissions available to each role depend on the access-control implementation in the application.

---

## Supported Disease Classes

The dataset contains six disease classes and one healthy-leaf class.

| Class               | Category |
| ------------------- | -------- |
| Algal Leaf Spot     | Disease  |
| Gall Thrips         | Disease  |
| Leaf Blight         | Disease  |
| Pollu Disease       | Disease  |
| Quick Wilt          | Disease  |
| Yellow Mottle Virus | Disease  |
| Healthy Leaves      | Healthy  |

---

## Severity Stages

Diseased leaves are classified into three severity stages:

1. **Early**
2. **Moderate**
3. **Advanced**

The severity-stage classification task contains:

**6 diseases × 3 severity stages + 1 healthy class = 19 classes**

The healthy class does not have a severity stage.

---

## Classification Tasks

Two classification settings are investigated.

### 1. Disease-wise Classification

The disease-wise model classifies an image into seven leaf-condition classes:

* Six disease classes
* One healthy-leaf class

### 2. Disease–Severity-Stage Classification

The second model performs fine-grained classification by distinguishing both disease identity and severity stage.

The output contains:

* 18 disease–severity combinations
* 1 healthy class
* **19 classes in total**

Separate MobileNetV2-based models are trained for the two classification tasks.

---

# System Features

The complete system combines the trained deep learning models with a web-based application.

### Main System Workflow

```text
User
  │
  ▼
Login / Registration
  │
  ▼
Upload Black Pepper Leaf Image
  │
  ▼
Image Validation
  │
  ▼
Image Preprocessing
  │
  ▼
Deep Learning Model
  │
  ▼
Disease Prediction
  │
  ├── Healthy
  │
  └── Disease
        │
        ▼
   Severity Stage
        │
        ▼
Disease / Severity Information
        │
        ▼
Treatment / Management Information
        │
        ▼
Result Display
```

---

## System Architecture

The application follows a web-based client-server architecture.

```text
┌─────────────────────────────┐
│       User Interface        │
│      Angular Frontend       │
└──────────────┬──────────────┘
               │
               │ HTTP / REST API
               ▼
┌─────────────────────────────┐
│       Flask Backend         │
│        Python API           │
├─────────────────────────────┤
│ Authentication              │
│ Image Validation             │
│ Image Preprocessing          │
│ Model Inference              │
│ Result Processing            │
└──────────────┬──────────────┘
               │
       ┌───────┴────────┐
       ▼                ▼
┌──────────────┐  ┌───────────────┐
│ TensorFlow / │  │    MySQL      │
│ Keras Model  │  │   Database    │
└──────────────┘  └───────────────┘
```

### Frontend Layer

The Angular frontend provides the user-facing interface.

Responsibilities include:

* User registration and login interfaces
* Role-based navigation
* Leaf image upload
* Prediction request submission
* Displaying prediction results
* Displaying disease and severity information
* Displaying treatment or management information

### Backend Layer

The Flask backend acts as the application and machine learning layer.

Responsibilities include:

* REST API handling
* User authentication
* Request validation
* Image validation
* Image preprocessing
* Loading the trained model
* Running model inference
* Processing prediction results
* Communicating with the database
* Returning prediction results to the frontend

### Database Layer

MySQL is used as the application's relational database.

The database supports application-related information such as:

* User accounts
* User roles
* Authentication-related information
* Disease information
* Treatment or management information
* Other system data required by the application

---

# Technologies Used

## Machine Learning

* **Python**
* **TensorFlow**
* **Keras**
* **MobileNetV2**
* **NumPy**
* **Pandas**
* **Scikit-learn**

## Backend

* **Python**
* **Flask**
* **REST API**
* **TensorFlow / Keras**
* **Flask-CORS**

## Frontend

* **Angular**
* **TypeScript**
* **HTML5**
* **CSS / SCSS**

## Database

* **MySQL**
* **MySQLdb / MySQL connector**

## Authentication and Security

* **JWT (JSON Web Token)**
* **bcrypt**
* Role-based access control

## Development and Version Control

* **Git**
* **GitHub**
* **Visual Studio Code**
* **Android/Smartphone-based image acquisition** for dataset collection

---

# Machine Learning Model

The research uses **MobileNetV2** with ImageNet-pretrained weights as the convolutional backbone.

MobileNetV2 provides a relatively lightweight architecture suitable for image classification and potential practical deployment.

### Model Architecture

```text
Input Image
    │
    ▼
256 × 256 × 3
    │
    ▼
MobileNetV2 Backbone
    │
    ▼
Global Average Pooling
    │
    ▼
Batch Normalization
    │
    ▼
Dense Layer
1024 units + ReLU
    │
    ▼
Dropout
0.5
    │
    ▼
Dense Layer
512 units + ReLU
    │
    ▼
Dropout
0.4
    │
    ▼
Softmax Output
```

Separate models are trained for:

* **7-class disease-wise classification**
* **19-class disease–severity-stage classification**

---

# Dataset

The dataset consists of black pepper leaf images collected from farms in Sri Lanka using smartphone-based image acquisition under natural field conditions.

The dataset represents:

* Six black pepper diseases
* Three severity stages
* Healthy leaves

The severity-stage experiment contains:

**3,990 images across 19 classes**

The dataset is based on field images rather than relying solely on controlled public datasets.

---

## Data Splitting

A farm-level splitting strategy is used to reduce the risk of data leakage.

Images from the same farm are kept within the same dataset partition rather than distributing them independently between training, validation, and testing sets.

The dataset is divided approximately into:

* Training set
* Validation set
* Test set

This approach provides a more realistic evaluation of model performance on images originating from farms not represented in the training data.

---

# Data Preprocessing

Before model training, images undergo preprocessing and training augmentation.

### Image Preprocessing

* Resize images to **256 × 256 pixels**
* Apply MobileNetV2-compatible preprocessing
* Maintain separation between training, validation, and test data

### Training Augmentation

Training images are augmented using:

* Rotation
* Width and height shifting
* Shearing
* Zooming
* Horizontal flipping
* Brightness variation

Validation and test images are evaluated without training augmentation.

---

# Training Strategy

Transfer learning is performed in two stages.

### Phase 1 – Feature Transfer

The MobileNetV2 convolutional backbone is initially frozen while the classification head is trained.

### Phase 2 – Fine-Tuning

Selected upper layers of MobileNetV2 are fine-tuned using a lower learning rate.

Training incorporates:

* Adam optimizer
* Label smoothing
* Class weighting
* Early stopping
* Learning-rate reduction
* Model checkpointing
* Mixed-precision training

---

# Evaluation

Model performance is evaluated using:

* Accuracy
* Precision
* Recall
* F1-score
* Macro-averaged metrics
* Confusion matrices
* Class-level error analysis

The analysis particularly considers:

* Confusion between disease classes
* Confusion between severity stages
* Errors involving visually similar symptoms
* Performance of individual classes
* Challenges associated with early-stage disease symptoms

---

# Results

The reported validation performance of the final experiments is:

| Classification Task                   | Classes | Validation Accuracy |
| ------------------------------------- | ------: | ------------------: |
| Disease-wise Classification           |       7 |          **81.90%** |
| Disease–Severity-Stage Classification |      19 |          **69.90%** |

The 19-class task is more fine-grained because the model must distinguish both disease identity and severity stage.

Confusion-matrix analysis indicates that several classification errors occur between visually similar disease classes and adjacent severity stages. Early-stage symptoms can be particularly difficult to distinguish because visible symptoms may be subtle.

> These results represent validation performance and should not be interpreted as equivalent to performance on all possible field conditions.

---

# Web Application

The trained models are integrated into a web-based application to demonstrate practical use of the research.

## Prediction Process

When a user uploads a black pepper leaf image:

1. The user logs into the system.
2. The user uploads a leaf image.
3. The frontend sends the image to the Flask backend.
4. The backend validates the uploaded file.
5. The image is resized and preprocessed.
6. The trained model performs inference.
7. The system identifies the predicted leaf condition.
8. If a disease is predicted, the relevant severity stage is identified.
9. The system retrieves relevant disease information.
10. Available treatment or management information is displayed.
11. The prediction result is returned to the frontend.

### Example Result

```text
Prediction Result

Disease:
Leaf Blight

Severity:
Moderate

Confidence:
XX.XX%

Information:
[Relevant disease information]

Management:
[Available treatment / management information]
```

The exact information displayed depends on the data available in the application database.

---

# User Roles

The system is designed around different users who may interact with agricultural disease information.

### Farmer

Farmers can use the application to:

* Upload black pepper leaf images.
* Identify the predicted disease.
* View the predicted severity stage.
* Read disease-related information.
* View available treatment or management recommendations.
* Use the results to support crop monitoring.

### Agricultural Officer

Agricultural officers can use the application to:

* Analyse black pepper leaf images.
* View predicted disease classifications.
* View disease severity-stage predictions.
* Access disease information.
* Access available treatment and management information.
* Support farmer-level disease monitoring and advisory activities.

### Administrator

Administrators are responsible for managing application-level information and users.

Depending on the implemented permissions, administrators can:

* Manage user accounts.
* Manage user roles.
* Manage disease information.
* Manage treatment or management information.
* Maintain system data.

---

# Authentication and Authorization

The application uses authentication mechanisms to control access to system functionality.

### Authentication

* User registration
* User login
* Password hashing using **bcrypt**
* JWT-based authentication

### Authorization

Role-based access control is used to distinguish access between different user types.

```text
User
 │
 ├── Farmer
 │
 ├── Agricultural Officer
 │
 └── Administrator
```

Each role can access the functionality assigned to that role.

---

# Database

The application uses **MySQL** for persistent application data.

The database is used to store system-related information such as:

```text
Users
 │
 ├── User details
 ├── Authentication information
 └── User role

Disease Information
 │
 ├── Disease name
 ├── Description
 └── Related information

Treatment / Management
 │
 ├── Disease
 ├── Management information
 └── Recommendations
```

The machine learning model itself is maintained separately from the relational database.

---

# Project Structure

The project is organized into separate frontend, backend, machine learning, and supporting components.

```text
Deep-Learning-Based-Identification-of-Diseases-in-Black-Pepper-Leaves-in-Sri-Lanka/
│
├── frontend/
│   ├── src/
│   ├── angular.json
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── app.py
│   ├── routes/
│   ├── models/
│   ├── services/
│   ├── authentication/
│   ├── database/
│   ├── model/
│   ├── requirements.txt
│   └── ...
│
├── model/
│   ├── disease-wise/
│   └── severity-stage/
│
├── dataset/
│   └── dataset-information/
│
├── notebooks/
│   ├── preprocessing/
│   ├── training/
│   └── evaluation/
│
├── results/
│   ├── confusion-matrices/
│   ├── classification-reports/
│   └── evaluation-results/
│
├── README.md
└── .gitignore
```

> Update the structure above to exactly match the folders and files included in the final repository.

---

# Installation and Setup

## Prerequisites

Install the following before running the project:

* Python
* Node.js
* npm
* Angular CLI
* MySQL
* Git

---

## Clone the Repository

```bash
git clone <YOUR-GITHUB-REPOSITORY-URL>

cd Deep-Learning-Based-Identification-of-Diseases-in-Black-Pepper-Leaves-in-Sri-Lanka
```

---

## Frontend Setup

Navigate to the Angular application:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
ng serve
```

Open:

```text
http://localhost:4200/
```

---

## Backend Setup

Navigate to the backend:

```bash
cd backend
```

Create a Python virtual environment:

```bash
python -m venv venv
```

Activate the environment on Windows:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Configure the required database and authentication environment variables.

Start the Flask application:

```bash
python app.py
```

The Angular frontend communicates with the Flask backend through the configured REST API.

---

# Example System Workflow

```text
                    USER
                      │
                      ▼
              Login / Registration
                      │
                      ▼
              Select Leaf Image
                      │
                      ▼
                Upload Image
                      │
                      ▼
             Angular Frontend
                      │
                      ▼
                Flask REST API
                      │
             ┌────────┴────────┐
             ▼                 ▼
       Image Processing      MySQL
             │
             ▼
       MobileNetV2 Model
             │
             ▼
        Model Prediction
             │
             ▼
       Disease / Healthy
             │
             ▼
       Severity Stage
             │
             ▼
    Disease Information
             │
             ▼
 Treatment / Management Info
             │
             ▼
        Result Display
```

# Acknowledgements

This research was conducted as part of an undergraduate research project in Computer Science at CINEC Campus, affiliated with the University of Wolverhampton.

The project focuses on applying deep learning and computer vision to black pepper disease identification under Sri Lankan field conditions.

