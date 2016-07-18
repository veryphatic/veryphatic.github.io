attribute vec4 vPosition;
uniform float theta;

void
main()
{
    gl_Position = vPosition;

    float d = sqrt( vPosition.x * vPosition.x + vPosition.y * vPosition.y );
    float s = sin( d * theta );
    float c = cos( d * theta );
    float x = vPosition.x * c - vPosition.y * s;
    float y = vPosition.x * s + vPosition.y * c ;

    gl_Position.x =  x;
    gl_Position.y =  y;
    gl_Position.z = 0.0;
    gl_Position.w = 1.8;

}