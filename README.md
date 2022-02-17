# Custom Wordle

An open source world clone that lets you create and share custom wordle-esque games.  
Running at https://deverkn.github.io/custom-wordle/

## Current Features

### Custom Word Bank
Chose your own word bank to select words from  
Includes built in word banks for 1 - 21 letter words

### Custom Guess Amount
What it sounds like

### Custom Goal Word
Pick a predetermined solution for playing against other people

## How to use it
All choices are represented as URL parameters  
ex:`https://deverkn.github.io/custom-wordle/?{parameters_here}`  
#### Options  
title : Choose a custom title  
(defaults to "YORDLE")

num_guesses : The maximum number of guesses a player can make  
(defaults to 5)

word_bank_type : "Custom" if you want to use your own word bank or "Default" to use a built in word bank  
(defaults to "Default")  

word_bank_length : If you used the Default word bank type use this to select the length of the words in the word bank, ranges from 1 to 21
(defaults to 5, the same as Wordle) 
Note: word banks past 15-ish start including compound words  

word_bank: If you used the Custom word bank type use this to set the word bank words enter each word seperated by a comma  
(ie. `?word_bank=dog,cat`)  
Notes: there currently isn't any verification that all words in the word bank are the same length but if you use word of different the game will obviously break. 

word : Use this to set a custom target word, can either be a word or an index in the word bank (ie. `?word=5` would use the 6th word in the wordbank) (if this is left empty or the word given isn't in the word bank it uses a random word from the word bank)  

## Examples

Default: https://deverkn.github.io/custom-wordle/  
50 Guesses, 20 Letter Words: https://deverkn.github.io/custom-wordle/?title=WORDLE%20HELL&num_guesses=50&word_bank_type=Default&word_bank_length=20  
1 Guess, Only 2 Words: https://deverkn.github.io/custom-wordle/?title=EZ&num_guesses=1&word_bank_type=custom&word_bank=dog,cat  
(Hint: Look at the URL): https://deverkn.github.io/custom-wordle/?title=GENIUS?&num_guesses=1&word_bank_type=default&word_bank_length=5&word=foggy  

### Upcoming Features
Game creation GUI  
Mobile interface (***technically*** it already works on mobile but ... don't)  
Word bank verification  
Seperate word banks for target words and guesses  
Saving game parameters outside of URL
