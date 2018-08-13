function setup() {
    createCanvas(512, 512);
    strokeWeight(10);
    // Initialize all values
    offset = .5;
    
     fill('rgba(0, 0, 0, 0)');
    stroke(200);
    rect(0, 0, 512, 512);
    
    textSize(16);
    
        // Translate the origin point to the center of the screen
    translate(width / 2, height / 2);
    
    
    s1 = random(40,150);
    r1 = 20+s1;
    theta1 = random(Math.PI/3-offset, Math.PI/3+offset) ;
    f1 = s1+100;
    
    s2 = random(40,150);
    r2 = 20+s2;
    theta2 = random(3*Math.PI/3-offset, 3*Math.PI/3+offset);
    f2= s2+100;
    
    s3 = random(40,150);
    r3 = 20+s3;
    theta3 = random(5*Math.PI/3-offset, 5*Math.PI/3+offset);
    f3 = s3+100;
    
    f1 = f2 = f3 = 255;
    
    
   

    // Convert polar to cartesian
    var x1 = r1 * cos(theta1);
    var y1 = r1 * sin(theta1);
    var x2 = r2 * cos(theta2);
    var y2 = r2 * sin(theta2);
    var x3 = r3 * cos(theta3);
    var y3 = r3 * sin(theta3);
    
    // Draw the ellipse at the cartesian coordinate
    ellipseMode(CENTER);
    
    stroke(255);
    strokeWeight(10);
    line(x1, y1, x2, y2);
    line(x2, y2, x3, y3);
    line(x3, y3, x1, y1);
    noStroke();
    
    fill(f1);
    ellipse(x1, y1, s1, s1);
    
    fill(f2);
    ellipse(x2, y2, s2, s2);
    
    fill(f3);
    ellipse(x3, y3, s3, s3);

    
}

function draw() {
    
    
    
}