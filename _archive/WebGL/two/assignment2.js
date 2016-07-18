/**
 Week 2 assignment
 **/


var week2 = (function(jQuery, ko){




    var _self,
        gl,
        canvas,
        program,
        canvasWidth,
        canvasHeight,
        bufferId,
        index = 0,
        positions = [];



    // View model
    function viewModel() {
        _self = this;
        this.redSlider = ko.observable(0);
        this.greenSlider = ko.observable(0);
        this.blueSlider = ko.observable(0);

        this.red = ko.computed(function(){
            return 'rgb(' + _self.redSlider() + ', 0, 0)';
        }, this);

        this.green = ko.computed(function(){
            return 'rgb(0, ' + _self.greenSlider() + ', 0)';
        }, this);

        this.blue = ko.computed(function(){
            return 'rgb(0, 0, ' + _self.blueSlider() + ')';
        }, this);


        this.colorMixed = ko.computed(function(){
            return 'rgb(' + _self.redSlider() + ',' +  _self.greenSlider() + ',' + _self.blueSlider() + ')';
        }, this);
    }




    // Setup
    function constructor() {

        console.log('Starting app');

        // Apply bindings
        ko.applyBindings(new viewModel());

        // Grab the canvas
        canvas = document.getElementById("assignment2");
        canvasWidth = canvas.width;
        canvasHeight = canvas.height;

        // Create GL context
        gl = WebGLUtils.setupWebGL(canvas);
        if (!gl) alert("Please use a modern browser. WebGL isn't supported here");

        // Setup the canvas
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.clearColor(0.0 ,0.0 ,0.0 ,1.0);

        // Setup the shaders
        program = initShaders(gl, "vshader.glsl", "fshader.glsl");
        gl.useProgram(program);

        // Create the buffers
        createBuffers();

        // Listen for mouse events
        jQuery('.glCanvas').on('mousedown', function(){
            jQuery('.glCanvas').on('mousemove', mapCoords)
        });
        jQuery('.glCanvas').on('mouseup', function(){
            jQuery('.glCanvas').unbind('mousemove');
        })



        // Start rendering
        render();
    }



    // Create the buffers
    function createBuffers() {
        bufferId = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);
        gl.bufferData(gl.ARRAY_BUFFER, 2000, gl.STATIC_DRAW );

        // Create the vPosition
        var vPosition = gl.getAttribLocation(program, "vPosition");
        gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(vPosition);

    }



    // Map the mouse (window canvas coordinates) to (clip coordinates)
    function mapCoords(event) {


        var clip = getCoords(event);
        positions.push(getCoords(event));

        // Update the buffer
        gl.bindBuffer(gl.ARRAY_BUFFER, bufferId);

        gl.bufferSubData(gl.ARRAY_BUFFER, sizeof['vec2'] * index, flatten(clip));
        //gl.drawArrays(gl.LINES, 0, 2);;

        if (sizeof['vec2'] * index >= 1996) {
            index = 0;
        }
        else {
            index++;
        }
    }



    function getCoords(event) {

        // get the offset
        var offset = jQuery('.glCanvas').offset();

        var mx = event.pageX - offset.left;
        var my = event.pageY - offset.top;


        var x = -1 + (2 * mx) / canvasWidth;
        var y = -1 + 2 * (canvasHeight - my) / canvasHeight;

        return vec2(x, y);
    }





    // Render
    function render() {
        //console.log('Rendering');
        gl.clear( gl.COLOR_BUFFER_BIT );

        // Draw the array
        //console.log(index);
        for(var i = 0; i<index; i+=2)
            gl.drawArrays(gl.LINE_STRIP, i, 2);;

        setInterval(function(){
            requestAnimFrame(render)
        }, 100)


    }



    return {
        constructor: constructor()
    }

})(jQuery, ko)