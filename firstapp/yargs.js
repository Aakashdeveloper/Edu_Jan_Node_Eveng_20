var user_input = process.stdin;
user_input.setEncoding('utf-8');
console.log('Enter your name');

user_input.on('data', function(data){
    console.log("Hi "+ data+ "Welcome")
});