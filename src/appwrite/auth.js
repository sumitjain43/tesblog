// import conf from "../conf/conf.js";
// import { Client, Account, ID } from "appwrite";

// export class Authservice {
//     client = new Client();
//     account;

//     constructor() {
//         try {
//             this.client
//                 .setEndpoint(conf.appwriteUrl)
//                 .setProject(conf.appwriteProjectId);
//             this.account = new Account(this.client);
//         } catch (error) {
//             console.error("Error initializing Appwrite Client:", error);
//             throw new Error("Failed to initialize authentication service");
//         }
//     }

//     async createAccount(email, password, name) {
//         try {
//             const userAccount = await this.account.create(
//                 ID.unique(),
//                 email,
//                 password,
//                 name
//             );

//             if (userAccount) {
//                 // Automatically log in after account creation
//                 return await this.login(email, password);
//             } else {
//                 console.warn("Account creation returned empty result");
//                 return null;
//             }
//         } catch (error) {
//             console.error("Error creating account:", error);
//             throw error; // Pass error to caller
//         }
//     }

//     async login(email, password) {
//         try {
//             const session = await this.account.createEmailPasswordSession(email, password);
//             const user = await this.account.get();
//             return { session, user };
//         } catch (error) {
//             console.error("Login failed:", error);
//             throw error;
//         }
//     }

//     async getcurrentUser() {
//         try {
//             const user = await this.account.get();
//             return user; 
//         } catch (error) {
//             if (error.code === 401) {
//                 // Unauthorized: No session
//                 console.warn("No user is logged in");
//                 return null;
//             }
//             console.error("Error fetching current user:", error);
//             return null;
//         }
//     }

//     async logout() {
//         try {
//             await this.account.deleteSessions();
//             console.log("User logged out successfully");
//             return true;
//         } catch (error) {
//             console.error("Error logging out:", error);
//             throw error;
//         }
//     }
// }

// const authService = new Authservice();
// export default authService;



// import conf from "../conf/conf.js";
// import { Client, Account, ID } from "appwrite";

// // const client = new Client()
// //     .setProject('<PROJECT_ID>'); // Your project ID

// // const account = new Account(client);

// // const promise = account.create('[USER_ID]', 'email@example.com', '');

// // promise.then(function (response) {
// //     console.log(response); // Success
// // }, function (error) {
// //     console.log(error); // Failure
// // });
// // likhte hai ab qualtity code

// export class Authservice{
//     client = new Client();
//     account;

//     constructor() {
//         this.client
//             .setEndpoint(conf.appwriteUrl)
//             .setProject(conf.appwriteProjectId);
//         this.account = new Account(this.client);
            
//     } 
//     async createAccount(email, password, name) {
//         try{
//             const userAccount = await this.account.create(
//                 ID.unique(), // Unique user ID
//                 email, // User email
//                 password, // User password
//                 name // User name
//             );
//             if(userAccount){
//                 return userAccount;//call another method //hamara yhn flow jo hai ham aesa krna chahte hai ki jisse bante hi acount login hi hojaye hamari choice hai ham ek msg bhi bhej sakte hai ki account create ho gaya hai
//                 return this.login ({email, password}); // Automatically log in after account creation
//             } else{
//                 return 
//             }

//         } catch (error) {
//             throw error;
//         }
//     }
//     async login(email, password) {
//         try {
//             const session = await this.account.createEmailPasswordSession(email, password);
//                     const user = await account.get();

//             return session; // Return the session object
//         } catch (error) {
//             throw error; // Handle errors appropriately
//         }
//     }
//    async getcurrentUser() {
//     try {
//         const user = await this.account.get();
//         return user; // Returns the current user object if logged in
//     } catch (error) {
//         console.error("Error fetching current user:", error);
//         return null; // Return null if no user is logged in or an error occurs
//     }
// }

//     async logout() {
//         try {
//             await this.account.deleteSessions(); // Delete the all session where user is logged in
//             // Optionally, you can also delete the user account if needed
//             // await this.account.delete(); // Uncomment this line to delete the user account
//             console.log("User logged out successfully");
//             // You can also return a success message or status
//             return true; // Return true on successful logout
//         } catch (error) {
//             throw error; // Handle errors appropriately
//         }   
//     }

// }

// const authService = new Authservice();


// export default authService

import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";


export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
            
    }

    async createAccount({email, password, name}) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                // call another method
                return this.login({email, password});
            } else {
               return  userAccount;
            }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}) {
        try {
            if (typeof this.account.createEmailPasswordSession === 'function') {
                return await this.account.createEmailPasswordSession(email, password);
            }
            // Fallback for SDKs where the method name is createEmailSession
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            // Suppress noisy 401 when no session exists (guest user)
            if (error && (error.code === 401 || error.type === 'general_unauthorized')) {
                return null;
            }
            console.log("Appwrite serive :: getCurrentUser :: error", error);
        }

        return null;
    }

    async logout() {

        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite serive :: logout :: error", error);
        }
    }
}

const authService = new AuthService();

export default authService