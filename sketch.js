//idée pour la suite: animer les points d'un random vers le suivant (1 random par seconde)
//animer la taille des points
//effets 3d comme spheres, ombrage, etc.
var min_radius = 120;
var radius = 200;
var number_of_dots = 7;
var min_size = 40;
var max_size = 80;
var circle_r = [];
var circle_theta = [];
var circle_size = [];
var circle_fill = [];
var x = [];
var y = [];

function setup() {
    createCanvas(512, 512);
    strokeWeight(10);
    // Initialize all values
    
     fill('rgba(0, 0, 0, 0)');
    stroke(200);
    rect(0, 0, 512, 512);

    
        // Translate the origin point to the center of the screen
    translate(width / 2, height / 2);
    
    for (i = 0; i < number_of_dots; i++) {
        circle_r[i] = random(min_radius, radius);
        circle_theta[i] = random(0, 2*Math.PI);
        circle_size[i] = random(min_size, max_size);
        circle_fill[i] = [255, random(100,255)];
    }
    

    // Draw the ellipse at the cartesian coordinate
    ellipseMode(CENTER);
    fill(255);
    stroke(255);
    strokeWeight(0);


    for (i = 0; i < number_of_dots; i++) {
        fill(circle_fill[i]);
        x[i] = circle_r[i] * cos(circle_theta[i]);
        y[i] = circle_r[i] * sin(circle_theta[i]);
        ellipse(x[i], y[i], circle_size[i], circle_size[i]);
    }
    
    
    stroke(255, 50);
    
    for (i = 0; i < number_of_dots; i++) {
        for (j = 0; j < number_of_dots; j++) {
            stroke(255, 50);
            strokeWeight(8);
            line(x[i], y[i], x[j], y[j]);
        }
    }

    
}

function draw() {
    
    
    
}