module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint",
  "rules": {
      "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
      "implicit-arrow-linebreak": [0],
      "jsx-a11y/label-has-associated-control": [ 2, {
        "components": [ "Label" ],
        "required": {
            "some": [ "id" ]
        },
        "allowChildren": false
      }]      
    },
    "env": { 
      "browser": true 
  }      
};