attribute vec4 vPosition;
uniform float theta;
varying vec4 fColor;

void main()
{
    fColor = vec4((1.0 + vPosition.xyz) / 2.0, 1.0);
    gl_Position = vPosition;

    float d = sqrt( vPosition.x * vPosition.x + vPosition.y * vPosition.y );
    float s = sin( d * theta );
    float c = cos( d * theta );

    gl_Position.x =  (vPosition.x * c) - (vPosition.y * s) ;
    gl_Position.y =  (vPosition.x * s) + (vPosition.y * c) ;
    gl_Position.z = 0.0;

    gl_Position.x *= 0.5;
    gl_Position.y *= 0.5;

}