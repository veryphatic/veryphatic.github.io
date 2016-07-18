/**
 Week 2 assignment
 **/


var week2_3d = (function(jQuery, ko){


    var _self,
        gl,
        canvas,
        program,
        points = [],
        vertices,
        theta;


    var baseColors = [
        vec3(1.0, 0.0, 0.0),
        vec3(0.0, 1.0, 0.0),
        vec3(0.0, 0.0, 1.0),
        vec3(0.0, 0.0, 0.0),
    ];



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
        gl.clearColor(0.0 ,0.0 ,0.0 ,1.0);

        // Setup the shaders
        program = initShaders(gl, "vshader_3d.glsl", "fshader_3d.glsl");
        gl.useProgram(program);


        // Define the initial vertices
        vertices = [
            vec3(-0.5, -0.5, -0.5),
            vec3(0.5, -0.5, -0.5),
            vec3(0.0, 0.5, 0.5),
            vec3(0.0, -0.5, 0.5),
        ];

        createData();
    }




    // Create the data
    function createData() {

        // Clear out the points for every rerender
        points = [];

        // Create the vertices
        divideTetra(vertices[0], vertices[1], vertices[2], vertices[3], parseInt(_self.subDivisions()));

        // Push the data to the GPU buffer object
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
        theta = gl.getUniformLocation(program, "theta");

        // Render
        render();
    }



    // Push the vertices into the point array
    function createNewPoint(a, b, c, d) {
        points.push(a, c, b, 0);
        points.push(a, c, d, 1);
        points.push(a, b, d, 2);
        points.push(b, c, d, 3);
    }



    // Divide the triange
    function divideTetra(a, b, c, d, count) {

        // Check for end of recursion
        if (count === 0) {
            createNewPoint(a, b, c, d);
        }
        else {

            var ab = mix( a, b, 0.5 );
            var ac = mix( a, c, 0.5 );
            var ad = mix( a, d, 0.5 );
            var bc = mix( b, c, 0.5 );
            var bd = mix( b, d, 0.5 );
            var cd = mix( c, d, 0.5 );

            --count;


            // three new triangles
            divideTetra( a, ab, ac, ad, count );
            divideTetra( ab, b, bc, bd, count );
            divideTetra( ac, bc, c, cd, count );
            divideTetra( ad, bd, cd, d, count );

        }
    }




    // Render
    function render() {
        console.log('Rendering');
        gl.clear( gl.COLOR_BUFFER_BIT );

        // Send theta
        gl.uniform1f(theta, parseFloat(_self.rotation()) * Math.PI/180);

        // Draw the array
        gl.drawArrays( gl.TRIANGLES, 0, points.length);
    }



    return {
        constructor: constructor()
    }

})(jQuery, ko)