/**
 Week 2 assignment
 **/


var week2 = (function(jQuery, ko){




    var _self,
        gl,
        canvas,
        program,
        points = [],
        vertices,
        theta;



    // View model
    function viewModel() {
        _self = this;
        this.subDivisions = ko.observable(5);
        this.rotation = ko.observable(0);
        this.reRender = createData;
    }




    // Setup
    function constructor() {

        console.log('Starting app');

        // Apply bindings
        ko.applyBindings(new viewModel());

        // Grab the canvas
        canvas = document.getElementById("glCanvas");

        // Create GL context
        gl = WebGLUtils.setupWebGL(canvas);
        if (!gl) alert("Please use a modern browser. WebGL isn't supported here");

        // Setup the canvas
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clearColor(0,0,0,0 );

        // Setup the shaders
        program = initShaders(gl, "vertex-shader", "fragment-shader");
        gl.useProgram(program);


        // Define the initial vertices
        vertices = [
            vec2(-0.5, -0.5),
            vec2(0, 0.5),
            vec2(0.5, -0.5)
        ];

        createData();

    }




    // Create the data
    function createData() {

        points = [];

        // Create the vertices
        divideTriangle(vertices[0], vertices[1], vertices[2], parseInt(_self.subDivisions()), parseFloat(_self.rotation()));

        // Push the data to the gpu and render
        pushGPU();
    }




    // Push the data to the GPU and render
    function pushGPU() {
        // Create the buffer
        var bufferId = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
        gl.bufferData(gl.ARRAY_BUFFER, flatten(points), gl.STATIC_DRAW);

        // Create the vPosition
        var vPosition = gl.getAttribLocation(program, "vPosition");
        gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vPosition);

        // Create the theta
        gl.getUniformLocation(program, "theta");


        // Render
        render();
    }



    // Push the vertices into the point array
    function createNewPoint(a, b, c) {
        //console.log(a,b,c);
        points.push(a, b, c);
    }



    // Divide the triange
    function divideTriangle(a, b, c, count, rotation) {
        // Check for end of recursion
        if (count === 0) {

            createNewPoint(a, b, c);
        }
        else {
            //bisect the sides

            // Rotate the point
            var _sin = Math.sin(parseFloat(_self.rotation()));
            var _cos = Math.cos(parseFloat(_self.rotation()));


            var ab = mix( a, b, 0.5 );
            var ac = mix( a, c, 0.5 );
            var bc = mix( b, c, 0.5 );


            // Rotate

            var ax = ab[0] * _cos - ab[1] * _sin;
            var ay = ab[1] * _sin + ab[1] * _cos;

            var bx = ac[0] * _cos - ac[1] * _sin;
            var by = ac[1] * _sin + ac[1] * _cos;

            var cx = bc[0] * _cos - bc[1] * _sin;
            var cy = bc[1] * _sin + bc[1] * _cos;


            var _ab = [ax, ay];
            var _ac = [bx, by];
            var _bc = [cx, cy];


            // End rotate



            --count;


            divideTriangle( a, _ab, _ac, count );
            divideTriangle( c, _ac, _bc, count );
            divideTriangle( b, _bc, _ab, count );

            // three new triangles
            //divideTriangle( a, ab, ac, count );
            //divideTriangle( c, ac, bc, count );
            //divideTriangle( b, bc, ab, count );
        }
    }



    // Render
    function render() {
        console.log('Rendering');
        gl.clear( gl.COLOR_BUFFER_BIT );

        // Send theta
        //gl.uniform1f(theta, _self.rotation());

        // Draw the array
        gl.drawArrays( gl.TRIANGLES, 0, points.length);
    }



    return {
        constructor: constructor()
    }

})(jQuery, ko)