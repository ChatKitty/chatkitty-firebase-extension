# ChatKitty

**Author**: ChatKitty, Inc. (**[https://chatkitty.com](https://chatkitty.com)**)

**Description**: ChatKitty is a complete chat platform you can use to build real-time chat features in your app.



**Details**: # ChatKitty Firebase Extension - Pre-installation Guide

Welcome to the ChatKitty Firebase Extension! This guide will walk you through the prerequisites and preparation steps you need to complete before installing the ChatKitty Firebase Extension. Ensuring these requirements are met will help you avoid issues during the installation and configuration process.

## Prerequisites

Before you install the ChatKitty Firebase Extension, please ensure that you meet the following prerequisites:

### 1. Firebase Project

You must have a Firebase project set up. If you don't already have a Firebase project, you can create one by following these steps:

1. Go to the [Firebase Console](https://console.firebase.google.com/).
2. Click on **"Add Project."**
3. Follow the on-screen instructions to set up your Firebase project.

### 2. Firebase Authentication

ChatKitty requires Firebase Authentication for user management. Make sure Firebase Authentication is enabled in your Firebase project:

1. In the Firebase Console, navigate to **Authentication**.
2. Click on **"Get started"** if you haven’t already enabled it.
3. Set up at least one sign-in method (e.g., Email/Password, Google, etc.).




**Configuration Parameters:**

* ChatKitty Client ID: Your ChatKitty Client ID. You can find this in your ChatKitty console.

* ChatKitty Client Secret: Your ChatKitty Client Secret. You can find this in your ChatKitty console.



**Cloud Functions:**

* **syncApplication:** Syncs your ChatKitty application with your Firebase project.

* **handleCreateUser:** Listens for user accounts to be created in your Firebase project and creates a ChatKitty user for each new user.

* **handleDeleteUser:** Listens for user accounts to be deleted in your Firebase project and deletes the corresponding ChatKitty user.



**APIs Used**:

* iam.googleapis.com (Reason: Required to sync ChatKitty users with Firebase users.)



**Access Required**:



This extension will operate with the following project IAM roles:

* firebaseauth.viewer (Reason: Required to list Firebase users to sync with ChatKitty users.)
