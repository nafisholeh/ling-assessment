# Ling-Assessment

<p align="center">
  <img src="https://github.com/nafisholeh/ling-assessment/assets/1610912/3b427360-262d-4777-8223-a6ba6c54f86c" alt="Simulator Screenshot - iPhone 15 Pro Max - 2024-06-07 at 22 12 49" width="300px"/>
  <img src="https://github.com/nafisholeh/ling-assessment/assets/1610912/bda43134-c589-4a13-8f9e-39f183a1fb9f" alt="Simulator Screenshot - iPhone 15 Pro Max - 2024-06-07 at 22 13 09" width="300px"/>
</p>

## Description
Ling-Assessment is a project designed to help users find and rank people based on the number of bananas they have. The main functionality includes searching for a user and displaying the top 10 users with the highest banana counts, with various sorting options and error handling.

## Features
- Search for a user by name
- Display a ranked list of the top 10 users with the most bananas
- Highlight the searched user in the list
- Error handling for non-existent users
- Sorting options by name and rank
- Fuzzy search capability

## Installation
To install and set up this project, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/nafisholeh/ling-assessment.git
    ```
2. Navigate to the project directory:
    ```bash
    cd ling-assessment
    ```
3. Install the necessary dependencies:
    ```bash
    npm install
    ```

## Usage
To use this project, follow these steps:

1. Start the project using Expo:
    ```bash
    npx expo start
    ```
2. Follow the command listed on the output to run on iOS simulator by pressing `i` or Android simulator by pressing `a`.

### Using the App
1. Input the user name in the search field and click the search button.
2. The app will render a list of the 10 people with the most bananas, including:
    - Name
    - Rank (1 for the highest number of bananas, 2 for the second-highest, etc.)
    - The number of bananas
3. The searched user will be highlighted in the list.
4. If the searched user does not exist, an error message will be shown: “This user name does not exist! Please specify an existing user name!”.
5. If the searched user has enough bananas to appear in the top 10, they will be included in the list. If not, they will replace the last rank of the top 10 list and their true rank will be displayed.
6. Options to sort the list by name and rank are available.
7. An option to show the lowest ranked users, with users having the same score listed alphabetically, is available.
8. Fuzzy search allows the user to search by partial name, showing usernames that match the criteria and sorting them by highest to lowest ranked users.

## Contributing
We welcome contributions to Ling-Assessment! Please follow these guidelines:

1. Fork the repository.
2. Create a new branch for your feature or bugfix:
    ```bash
    git checkout -b feature/your-feature-name
    ```
3. Commit your changes:
    ```bash
    git commit -m "Describe your changes"
    ```
4. Push to the branch:
    ```bash
    git push origin feature/your-feature-name
    ```
5. Create a pull request.

## License
This project is licensed under the [MIT License](LICENSE).
