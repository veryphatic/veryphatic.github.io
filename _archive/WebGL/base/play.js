

var play = (function(){


    var gl,
        glCanvas,
        program;


    // Construtor
    function constructor() {
        // Grab the canvas
        glCanvas = document.getElementById('playCanvas');

        //  Grab the gl context
        gl =  WebGLUtils.setupWebGL(glCanvas);
        if (!gl) console.error('No GL canvas available on this browser');

        // Setup the canvas
        gl.viewport(0, 0, glCanvas.width, glCanvas.height);
        gl.clearColor(0, 0, 0, 1);


        WebGLShaderLoader.load(gl, ['vshader.glsl', 'fshader.glsl'], null, function (errors, gl, programs, images) {
            if (errors.length) return console.error.apply(console, errors);
            program = programs[0].program;
            gl.useProgram(program);
            createBuffers();
        });

    }



    // Create the buffer data
    function createBuffers() {

        // Setup the vertices
        var vertices = [
            vec2(0, 1),
            vec2(1, 0),
            vec2(-1, 0),
            vec2(0, -1)
        ];

        // Load the data into the GPU
        var bufferId = gl.createBuffer();
        gl.bindBuffer( gl.ARRAY_BUFFER, bufferId );
        gl.bufferData( gl.ARRAY_BUFFER, flatten(vertices), gl.STATIC_DRAW );


        var vPosition = gl.getAttribLocation( program, "vPosition" );
        gl.vertexAttribPointer( vPosition, 2, gl.FLOAT, false, 0, 0 );
        gl.enableVertexAttribArray( vPosition );


        // Render
        render();
    }



    // Render
    function render() {
        console.log('Rendering');
        gl.clear( gl.COLOR_BUFFER_BIT );

        // Draw the array
        gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4);
    }



    return {
        constructor: constructor()
    }

})();