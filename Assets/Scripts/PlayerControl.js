/////////////////
// 立體機動裝置 //
/////////////////
#pragma strict


public var PlayerControlsGUI : GameObject;
public var Joystick : Joystick;
//private

// Controls
///////////////////////////////////

private var control_forward_buffer_rate = 20;
private var control_rotate_buffer_rate = 5;
private var update_c = 0;
private var buffer_forward = new float[control_forward_buffer_rate];
private var buffer_rotate_up = new float[control_rotate_buffer_rate];

// Animatiom
///////////////////////////////////
private var speed_state : int;


// Universal
///////////////////////////////////
private var i : int;
private var j : int;
private var t : int;


// Test Zone //
var t001a = 0;

function Start () {


	// Initialize Variables
	///////////////////////////////////

	for (var i in buffer_forward) { buffer_forward[i] = 0; };
	for (var i in buffer_rotate_up) { buffer_rotate_up[i] = 0; };

	// Test Zone //


}

function Update () {

	// Basic Controls
	///////////////////////////////////

	// Joystick
	buffer_forward[update_c] = Joystick.position.y+1;
	var forward = 0.0;
	for (i=0; i<control_forward_buffer_rate; i++)
		forward += buffer_forward[i];
	forward /= control_forward_buffer_rate;
	rigidbody.velocity = transform.forward*forward*70;

	// Gravity
	if (Input.acceleration.x || Input.acceleration.y) {
		var rotate_up = Input.acceleration.x;
		if (rotate_up > 0.3) rotate_up = 0.3;
		else if (rotate_up < -0.3) rotate_up = -0.3;
		transform.Rotate(Vector3.up, rotate_up*18);
		print(rotate_up);
	}


	// Moving Animation
	///////////////////////////////////

	// Decide speed state
	if (speed_state == 0 && rigidbody.velocity.magnitude > 0.01)  // 0 to 1
		speed_state = 1;
	else if (speed_state == 1 && rigidbody.velocity.magnitude > 3)  // 1 to 2
		speed_state = 2;
	else if (speed_state == 2 && rigidbody.velocity.magnitude < 2.5) // 2 to 1
		speed_state = 1;
	else if (rigidbody.velocity.magnitude == 0) speed_state = 0;  // all to 0

	// On grond animation
	if (speed_state == 1) {
		animation.CrossFade("Walk", 0.2);
		animation["Walk"].speed = rigidbody.velocity.magnitude/2.2;
	} else if (speed_state == 2) {
		animation.CrossFade("Run", 0.2);
		animation["Run"].speed = rigidbody.velocity.magnitude/5;
	} else if (speed_state == 0) {
		animation.CrossFade("Stand", 0.2);
	}







	// Test Zone //
	print(Joystick.position.y);
	print(Joystick.transform.position.y);
	if (!animation.IsPlaying("Kill")) {
		if (Input.GetKeyDown(KeyCode.T)) {
			if (t001a == 0) animation.CrossFade("Walk", 0.5);
			else if (t001a == 1) animation.CrossFade("Run", 0.5);
			else if (t001a == 2) animation.CrossFade("Fly", 0.5);
			else if (t001a == 3) animation.CrossFade("Fly2", 0.5);
			else if (t001a == 4) {
				print("PreKill");
				animation.CrossFade("PreKill", 0.5);
			}
			else if (t001a == 5) {
				animation.Play("Kill");
				animation.CrossFadeQueued("Fly", 0.3);
			}
			else if (t001a == 6) animation.CrossFade("Stand", 0.5);
			else t001a = 0;
			t001a++;
		}
	}


}
