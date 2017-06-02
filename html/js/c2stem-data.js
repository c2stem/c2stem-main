C2Stem.prototype.loadHomeData = function (callback) {
    var res = {
        modules: [{
            id: '1dmotion',
            name: "1D motion",
            icon: "img/school-bus.png"
        }, {
            id: 'm2',
            name: "Relative motion",
            icon: "img/boat.png"
        }, {
            id: 'm3',
            name: "Gravity",
            icon: "img/plane.png"
        }, {
            id: 'm4',
            name: "Rocket landing",
            icon: "img/falcon9.png"
        }, {
            id: 'devmod',
            name: "Development",
            icon: "img/work-in-prog.png"
        }]
    };

    // hack, to make sure that we are logged in
    this.login(null, null, null, function (err) {
        callback(err, err ? null : res);
    });
}

C2Stem.prototype.loadModuleData = function (id, callback) {
    var res;

    if (id === '1dmotion') {
        res = {
            id: id,
            name: '1D motion',
            tasks: [{
                id: '1d-basics',
                name: 'Instructional Task - Develop Simple Motion Simulation'
            }, {
                id: '1d-elaborate',
                name: 'Instructional Task - 1D Velocity: Elaborate Your Simulation'
            }, {
                id: '1d-steps',
                name: 'Instructional Task - 1D Velocity: Use a Simulation Step'
            }, {
                id: '1d-constant',
                name: 'Model Building - 1D Velocity: Simulate the Motion of a Truck'
            }, {
                id: '1d-liftoff',
                name: 'Instructional Task - 1D Acceleration:Introduction to Acceleration'
            }, {
                id: '1d-PVT',
                name: 'Instructional Task - 1D Acceleration: Position-Velocity-Time'
            },{
                id: '1d-velocitychange',
                name: 'Instructional Task - 1D Acceleration: “Velocity Change Rate'
            },{
                id: '1d-stop',
                name: 'Model Building -1D Acceleration: Make Your Truck Stop'
            },{
                id: '1d-deliver',
                name: 'Challenge Problem: Deliver the Medicine to the River! '
            }]
        };
    } else if (id === 'devmod') {
        res = {
            id: id,
            name: 'Development',
            tasks: [{
                id: 'snaptest',
                name: 'How to embed SNAP'
            }]
        };
    } else {
        res = {
            id: 'unknown',
            name: 'Unknown module',
            tasks: []
        }
    }

    // hack, to make sure that we are logged in
    this.login(null, null, null, function (err) {
        callback(err, err ? null : res);
    });
}

C2Stem.prototype.loadTaskData = function (id, callback) {
    var res;

    if (id === '1d-basics') {
        res = {
            parent: {
                id: '1dmotion',
                name: '1D motion'
            },
            id: id,
            name: 'Basics',
            tabs: [{
                id: 'desc',
                type: 'desc',
                name: 'Description',
                markup: `
                <blockquote>
                    Get the fundamentals down and the level of everything you do will rise.
                    <cite>Michael Jordan</cite>
                </blockquote>
                <p>
                    Before we dive into building models and solving problems in physics, we are going to learn a few basic concepts 
                    about computational modeling and representations. This will show you how to extend your Snap programming skills 
                    to build computational models in Physics. Before we dive into building models and solving problems in physics, 
                    we are going to learn a few basic concepts about computational modeling and representations. 
                    This will show you how to extend your Snap programming skills to build computational models in Physics. 
                </p>
                <p> By the end of this task, you should have an understanding of the following concepts:</p>
                <table>
                    <tr>
                    <th>Physics</th>
                    <th>Computational</th>
                    <th>Practices</th>
                    </tr>
                    <tr>
                    <td>Changing an Object’s Position</td>
                    <td>Defining Variables and Assigning Values</td>
                    <td> </td>
                    </tr>
           			<tr>
           				<td> </td>
           				<td>Input and Output Messages</td>
           				<td></td>
           			</tr>
           			<tr>
           				<td> </td>
           				<td>C2STEM Operators and Expressions</td>
           				<td></td>
           			</tr>
           			<tr>
           				<td> </td>
           				<td>A Basic Algorithm Structure</td>
           				<td></td>
           			</tr>
                </table>
                <div>
                <img src="img/task1a turtle.png" alt="turtle" width="20%" align="left"/>
                <p>
                    <em>Move Object One Step.</em>
                   Write a program that asks the user for the x coordinate of an object in m when the Green Flag is clicked, and then places the object at that location.
                </p>
                <p>
                    <em>Move Object Multiple Steps.</em>
                    Without using loops, make the sprite move 1 m/s to the right.  Hint: You must manually run your program multiple times
                </p>
                </div>
                `
            },  {
                id: 'resource',
                type: 'desc',
                name: 'Resources',
                markup: `
                <div id="sidebar">
                    <ul>
                        <h3><strong>Resources</strong></h3>
                        <h4><strong>Physics Concepts</strong></h4>
                        <li><a href="#Speed">Speed</a></li>
                        <li><a href="#Velocity">Velocity</a></li>
                        <li><a href="#Accelaration">Accelaration</a></li>
                        <h4><strong>Computational Concepts</strong></h4>
                        <li><a href="#glossary">Glossary of Blocks</a></li>
                        <h4><strong>Practices</strong></h4>
                        <li><a href="#simulation">Simulation Model</a></li>
                        <li><a href="#conceptual">Conceptual Model</a></li>
                        
                    </ul>
                    <div class="sidebar-bttn burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                
                <div id="Speed" class="tab-content">
                    <div class="sidebar-bttn burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <p>Your interpretation of velocity is likely very similar to the scientific definition. 
                    We have all seen speed limit signs denoting a certain miles per hour rate that you cannot and should not drive above. 
                    <span><b>Speed</b></span> is a <span>scalar</span> quantity that refers to "how fast an object is moving." Speed can be thought of as the rate at which an object covers distance. 
                    A fast-moving object has a high speed and covers a relatively large distance in a short amount of time. 
                    Contrast this to a slow-moving object that has a low speed; 
                    it covers a relatively small amount of distance in the same amount of time. An object with no movement at all has a zero speed.
                    </p>
                </div>
                <div id="Velocity" class="tab-content">
                <div class="sidebar-bttn burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <p>Velocity in contrast is a vector quantity, therefore, it includes both magnitude (speed) and direction. 
                    <b>Velocity</b> is defined as "the rate at which an object changes its position." 
                    Therefore, if a person takes 3 steps to the right along the x-axis, and 1 to the left on the x-axis in one second, 
                    we compute the person’s velocity to be 2 steps/second in the x-direction. In general, velocity is defined as the change in position</p>
                    <p>divided by the time of that change. Mathematically, this can be written as: </p>
                    <p>In the above equation ▲x represents the change in position of the object in one time step, 
                    and ▲t is the length of the time step. ▲t is a special variable and an important component of a simulation step. 
                    You may not see this right away, but as you get to more complex simulations, you will see that making ▲t small will generate more accurate behaviors.
                     However, there is a tradeoff. Suppose you want to generate the behavior of your system for t seconds from the start of the simulation. 
                     t is called the simulation time. If we reduce ▲t, we may make our simulation results more accurate, but our simulation will take longer to run. 
                     Therefore, there is a tradeoff between how fast you want your simulation to complete, versus how accurate you want the simulated behaviors to be. 
                     In most situations, small changes in ▲t will not make noticeable differences in the execution time of a simulation, 
                     because computers nowadays are  quite powerful.
                    </p>
                    <img class="ImageStyle" src="img/equation.png"  width="10%" align="centre"/>
                    <p>Now, in order to accurately model the movement of our medical truck in our simulation we will need to change the position of our object (the truck) based on the set velocity. 
                    Keep this velocity equation in mind when you design your algorithm!</p>
                </div>
                <div id="Accelaration" class="tab-content">
                <div class="sidebar-bttn burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <iframe class="resourseiFrame" width="60%" height="300" src="https://www.youtube.com/embed/FOkQszg1-j8?ecver=1" frameborder="0" allowfullscreen></iframe>
                    <p>As you may have seen in the video, acceleration is defined as the rate at which velocity changes. 
                    Mathematically, this can be wriiten as:</p>
                    <img class="ImageStyle" src="img/second_equation.png"  width="10%" align="centre"/>
                    <div>
                    <img class="imgFloat" src="img/position-velocity-time.png"  width="30%" />
                    <p> where  Δv is the change in velocity over a simulation time step, and Δt is the length of the simulation time step in seconds.</p>
                    <p>To understand acceleration, study this table. In this example, the  velocity of the object changes by a constant amount every time step (second). 
                    Note how the velocity itself changes as time advances.  
                    What about the change in position over time? Think on the equation(s) used in your final velocity module as you prepare the next few tasks!</p>
                    </div>
                </div>
                <div id="glossary" class="tab-content">
                <div class="sidebar-bttn burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <p>This is third</p>
                </div>
                <div id="simulation" class="tab-content">
                <div class="sidebar-bttn burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div>
                    <p>Our goal in this project is to learn physics by building computational models. 
                    Here we will build a particular form of a computational model called a simulation model. 
                    Let us explore what we mean by a simulation model. What are its essential components?</p>
                    <p><b>Computational modeling</b> is the use of computers to simulate and study the behaviors of systems. 
                    A computational model contains variables that characterize the system being studied and the relations between those variables, expressed in a mathematical form. 
                    Computational models come in various form. One type of a computational model  is a  <b>simulation model</b>, where we model the behaviors of a system in a mathematical and logical form that can be executed as a computer program.  
                    In the current study, we will build simulation models in kinematics, 
                    which is a branch of physics where we model the motion of physical objects without considering the forces that cause the motion. </p>
                    <img class="imgFloat" src="img/simulation.png"  width="20%" />
                    <p>Since we are interested in the motion of objects, our simulation models will capture the behaviors of objects over time. 
                    There are many ways in which we can model the behavior of an object over time. 
                    One useful way is to define how the behavior of objects evolve over one time step.
                     One can then simulate or execute this model for multiple time steps to study how the behavior of the objects evolve over time. 
                     In other words, we define the model of the system for one  simulation step, and  repeat the execution for a fixed number of steps.
                      Sometimes, we can execute the simulation in an infinite loop, until a specific termination command ends the simulation.</p>
                      <p>SImulation helps us solve problems digitally on a computer, which saves us a lot of time and money, especially when we design and build complex systems like cars, aircraft, spacecraft, and power plants. Simulations also help us understand the natural and physical world, and how we may interact with the world in an effective and safe manner. To do this, we run experiments with our simulation models.</p>
                     <p> To run experiments with the model,  one can vary some of the variables of the system model, to understand how the behaviors are affected by the variable values, and also to determine what variables achieve specific outcomes. </p>
                      <p><em>Why do we care?</em>  When you are driving  a car and see a sharp bend ahead, you know you have to slow down to negotiate the bend; but how  often do you think of the deceleration needed to slow down the car to a safe speed? You may not, but the engineers who design the car do. Very often, these engineers create simulation models to study and design how to provide safe braking functions. </p>
                      <p>So far, all of our actions happen as soon as the green flag is clicked. As a means of adding more structure to the program, let’s create a model for a simulation step. To do so, initial variable creation will still happen at the green flag (such as asking the user for input and setting the respective variable to the submitted answer), but the simulation actions will take place in a simulation step that is called once all variables are initialized. </p>
                    </div>
                </div>
                <div id="conceptual" class="tab-content">
                <div class="sidebar-bttn burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <p><b>Introduction to the Conceptual Modeling:</b>  We talked about building computational models earlier to describe motion of physical objects. We also saw that computational modeling on a computer involved creating programs that represent computational models of the physical system or phenomenon that contain one or more objects. Initially, this entails identifying (or exploring) the parameters (variables) </p>
                    <img class="ImageStyle" src="img/equation.png"  width="10%" align="centre"/>
                    <p>that play a role in the system being modeled and the mechanisms or rules that govern the phenomenon (these then constitute the “algorithm” in the computational model). </p>
                    <p>Very often, especially as the phenomenon being modeled becomes complex, it is useful to generate a structure for the model that we are trying to construct. Scientists and engineers often call this an abstract representation of a problem. Why do we want to create an abstract representation of a problem before we build its computational model and study its behaviors?</p>
                    <p>The principle of abstraction is very important in programming. Through the process of abstraction, a programmer hides all but the relevant details about an object in order to reduce the complexity in its description, and also making it easier to write programs that define its behaviors.  You can see that the same issues apply when we think of modeling a science phenomena.  For example, if we are modeling the motion of an object in kinematics, the position, velocity, and acceleration of the object at any time, are important parameters or variables to describe the object’s motion. On the other hand, the shape and size of the object, its color, whether the body of the object has stripes painted on it, and who the object belongs to is irrelevant. By choosing only the relevant properties of  objects, and none of the extraneous ones makes it easier for us define the behaviors and then build computational models corresponding to these behaviors.  In C2STEM, we will adopt this practice of combining conceptual and computational modeling, to help us structure the modeling task, and make it easier for us to generate correct model behaviors. You can see that this idea is simultaneously supported as a good programming practice. So, let us adopt it as we move forward.</p>
                    <p>In C2STEM we will be utilizing a conceptual model in order to organize the variables and behaviors that define each physics simulation model. Think of conceptual modeling or creating an abstract representation also as big picture planning when constructing a model. What components of the model do we need to build simulation models for using physics concepts and principles (laws)? We do not want to overload our computational model (and we definitely don’t want to overthink/create confusion with too many possibilities!).</p>
                    <p>In the Conceptual Model tab, you will need to add an objects that are relevant to the scenario you are building the model for, and add the necessary properties and behaviors that agent will need to have in the computational model to correctly model the system behavior. </p>
                </div>
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
                <script >
                            
                    $(document).ready(function() {
                        $('.burger').click(function() {
                           $('#sidebar').toggleClass('visible');
                           $('.tab-content').toggleClass('active-nav');
                        }); 
                        $('#sidebar ul li').addClass('active');
                        $('.tab-content:not(:first)').hide();
                        $('#sidebar ul li a').click(function(event){
                            event.preventDefault();
                            var content=$(this).attr('href');
                            $(this).parent().addClass('active');
                            $(this).parent().siblings().removeClass('active');
                            $(content).show();
                            $(content).siblings('.tab-content').hide();	
                        });
                    });
                </script>
                `
            }, {
                id: 'onestep',
                type: 'snap1',
                name: 'Move One Step',
                template: {
                    user: 'nicole',
                    proj: 'sf training 1a'
                }

            }, {
                id: 'twostep',
                type: 'snap1',
                name: 'Move Multiple Steps',
                template: {
                    user: 'nicole',
                    proj: 'sf training 1b'
                }
            }]
        };
    } else if (id === '1d-constant') {
        res = {
            parent: {
                id: '1dmotion',
                name: '1D motion'
            },
            id: id,
            name: 'Model Building - 1D Velocity: Constant Velocity',
            tabs: [{
                id: 'desc',
                type: 'desc',
                name: 'Description',
                markup: `
                <h2>Task Description: </h2>
                <p>Knowledge Goals for this Unit: </p>
                <table>
                    <tr>
                    <th>Physics</th>
                    <th>Computational</th>
                    <th>Practices</th>
                    </tr>
                    <tr>
                    <td>x<span class="descSubscript">k+1</span>= x<span class="descSubscript">k</span> + Δx</td>
                    <td>Initializing Variables</td>
                    <td>Simulation Model</td>
                    </tr>
           			<tr>
           				<td> Δt (time step)</td>
           				<td>Iteration </td>
           				<td></td>
           			</tr>
           			<tr>
           				<td>Change in position within a time step: Δx = vΔt </td>
           				<td>Conditionals </td>
           				<td></td>
           			</tr>
           			<tr>
           				<td> </td>
           				<td>Input/Output</td>
           				<td></td>
           			</tr>
           			<tr>
           				<td> </td>
           				<tdDebugging</td>
           				<td></td>
           			</tr>
           			<tr>
           				<td> </td>
           				<td>Test Cases</td>
           				<td></td>
           			</tr>
           			<tr>
           				<td> </td>
           				<td>Operators and Expression</td>
           				<td></td>
           			</tr>
                </table>
                
                <p><b>Build a Simulation Model:</b> It is time to set off on our journey to deliver the medicine! For the next few tasks, you will be responsible for recording the accurate velocity, acceleration, and position of your medical truck as it makes its journey in time. </p>
                <p>In this first step, your truck will be pacing a farm. Due to hazards such as animal crossings, you must maintain a velocity of 0.6m/s as you pass through that area. Unfortunately, this may cause a delay in your trip. To analyze this, use the cone sprite to support you in analyzing how much time it takes to travel the distance of the farm (to the intersecting dirt road) at a constant velocity of 0.6 m/s.</p>
                <p>To do so, select your agent and its properties and behaviors in the Conceptual Model. Then, initialize the necessary variables for the simulation and define the simulation step using the behavior(s) selected. Assume your truck has already slowed down to 0.6 m/s at the first cone.  Use your simulation model to determine the time it would require to cross cone 2 and cone 3. Cone 3, at the end of the farm is 1 km away from cone 1.</p>
                <div>
                <img class="imgFloat" src="img/constant velocity.png"  width="30%" />
                <p><em>Hint:</em> When you add a property or a behavior for your agent in the Conceptual Model. Consider the properties to be variables that you can set values for and use to compute your objects’ behaviors. When you add a behavior, it will appear as a block in the computational model. You can add this behavior to the simulation step (as it is part of the actions in the simulation) and, when you click on the behavior in your code, you can add the necessary code that will allow that object to accurately demonstrate its behaviors in the scenario that you are modeling.</p>
                <p><b>Generate a graph:</b> Now run an experiment noting the distance traveled at different points in time starting from cone 1. Use the values you generate from your simulation model to draw a distance versus time graph.  What is the nature of this plot?  What corresponds to the velocity of the vehicle in this plot?  Why is generating a graph useful?</p>
                <p>Problem: Let’s  assume that the farmer has not specified a speed limit, and the driver wants to cover the 1 km span of the road in 8 minutes. What speed should he set for his truck from cone 1 to cone 3, so he can cover the distance in 8 minutes?</p>
                </div>
                `
            },  {
                id: 'resource',
                type: 'desc',
                name: 'Resources',
                markup: `
                <div id="sidebar">
                    <ul>
                        <h3><strong>Resources</strong></h3>
                        <h4><strong>Physics Concepts</strong></h4>
                        <li><a href="#Speed">Speed</a></li>
                        <li><a href="#Velocity">Velocity</a></li>
                        <li><a href="#Accelaration">Accelaration</a></li>
                        <h4><strong>Computational Concepts</strong></h4>
                        <li><a href="#glossary">Glossary of Blocks</a></li>
                        <h4><strong>Practices</strong></h4>
                        <li><a href="#simulation">Simulation Model</a></li>
                        <li><a href="#conceptual">Conceptual Model</a></li>
                        
                    </ul>
                    <div class="sidebar-bttn burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                
                <div id="Speed" class="tab-content">
                    <div class="sidebar-bttn burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <p>Your interpretation of velocity is likely very similar to the scientific definition. 
                    We have all seen speed limit signs denoting a certain miles per hour rate that you cannot and should not drive above. 
                    <span><b>Speed</b></span> is a <span>scalar</span> quantity that refers to "how fast an object is moving." Speed can be thought of as the rate at which an object covers distance. 
                    A fast-moving object has a high speed and covers a relatively large distance in a short amount of time. 
                    Contrast this to a slow-moving object that has a low speed; 
                    it covers a relatively small amount of distance in the same amount of time. An object with no movement at all has a zero speed.
                    </p>
                </div>
                <div id="Velocity" class="tab-content">
                <div class="sidebar-bttn burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <p>Velocity in contrast is a vector quantity, therefore, it includes both magnitude (speed) and direction. 
                    <b>Velocity</b> is defined as "the rate at which an object changes its position." 
                    Therefore, if a person takes 3 steps to the right along the x-axis, and 1 to the left on the x-axis in one second, 
                    we compute the person’s velocity to be 2 steps/second in the x-direction. In general, velocity is defined as the change in position</p>
                    <p>divided by the time of that change. Mathematically, this can be written as: </p>
                    <p>In the above equation ▲x represents the change in position of the object in one time step, 
                    and ▲t is the length of the time step. ▲t is a special variable and an important component of a simulation step. 
                    You may not see this right away, but as you get to more complex simulations, you will see that making ▲t small will generate more accurate behaviors.
                     However, there is a tradeoff. Suppose you want to generate the behavior of your system for t seconds from the start of the simulation. 
                     t is called the simulation time. If we reduce ▲t, we may make our simulation results more accurate, but our simulation will take longer to run. 
                     Therefore, there is a tradeoff between how fast you want your simulation to complete, versus how accurate you want the simulated behaviors to be. 
                     In most situations, small changes in ▲t will not make noticeable differences in the execution time of a simulation, 
                     because computers nowadays are  quite powerful.
                    </p>
                    <img class="ImageStyle" src="img/equation.png"  width="10%" align="centre"/>
                    <p>Now, in order to accurately model the movement of our medical truck in our simulation we will need to change the position of our object (the truck) based on the set velocity. 
                    Keep this velocity equation in mind when you design your algorithm!</p>
                </div>
                <div id="Accelaration" class="tab-content">
                <div class="sidebar-bttn burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <iframe class="resourseiFrame" width="60%" height="300" src="https://www.youtube.com/embed/FOkQszg1-j8?ecver=1" frameborder="0" allowfullscreen></iframe>
                    <p>As you may have seen in the video, acceleration is defined as the rate at which velocity changes. 
                    Mathematically, this can be wriiten as:</p>
                    <img class="ImageStyle" src="img/second_equation.png"  width="10%" align="centre"/>
                    <div>
                    <img class="imgFloat" src="img/position-velocity-time.png"  width="30%" />
                    <p> where  Δv is the change in velocity over a simulation time step, and Δt is the length of the simulation time step in seconds.</p>
                    <p>To understand acceleration, study this table. In this example, the  velocity of the object changes by a constant amount every time step (second). 
                    Note how the velocity itself changes as time advances.  
                    What about the change in position over time? Think on the equation(s) used in your final velocity module as you prepare the next few tasks!</p>
                    </div>
                </div>
                <div id="glossary" class="tab-content">
                <div class="sidebar-bttn burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <p>This is third</p>
                </div>
                <div id="simulation" class="tab-content">
                <div class="sidebar-bttn burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div>
                    <p>Our goal in this project is to learn physics by building computational models. 
                    Here we will build a particular form of a computational model called a simulation model. 
                    Let us explore what we mean by a simulation model. What are its essential components?</p>
                    <p><b>Computational modeling</b> is the use of computers to simulate and study the behaviors of systems. 
                    A computational model contains variables that characterize the system being studied and the relations between those variables, expressed in a mathematical form. 
                    Computational models come in various form. One type of a computational model  is a  <b>simulation model</b>, where we model the behaviors of a system in a mathematical and logical form that can be executed as a computer program.  
                    In the current study, we will build simulation models in kinematics, 
                    which is a branch of physics where we model the motion of physical objects without considering the forces that cause the motion. </p>
                    <img class="imgFloat" src="img/simulation.png"  width="20%" />
                    <p>Since we are interested in the motion of objects, our simulation models will capture the behaviors of objects over time. 
                    There are many ways in which we can model the behavior of an object over time. 
                    One useful way is to define how the behavior of objects evolve over one time step.
                     One can then simulate or execute this model for multiple time steps to study how the behavior of the objects evolve over time. 
                     In other words, we define the model of the system for one  simulation step, and  repeat the execution for a fixed number of steps.
                      Sometimes, we can execute the simulation in an infinite loop, until a specific termination command ends the simulation.</p>
                      <p>SImulation helps us solve problems digitally on a computer, which saves us a lot of time and money, especially when we design and build complex systems like cars, aircraft, spacecraft, and power plants. Simulations also help us understand the natural and physical world, and how we may interact with the world in an effective and safe manner. To do this, we run experiments with our simulation models.</p>
                     <p> To run experiments with the model,  one can vary some of the variables of the system model, to understand how the behaviors are affected by the variable values, and also to determine what variables achieve specific outcomes. </p>
                      <p><em>Why do we care?</em>  When you are driving  a car and see a sharp bend ahead, you know you have to slow down to negotiate the bend; but how  often do you think of the deceleration needed to slow down the car to a safe speed? You may not, but the engineers who design the car do. Very often, these engineers create simulation models to study and design how to provide safe braking functions. </p>
                      <p>So far, all of our actions happen as soon as the green flag is clicked. As a means of adding more structure to the program, let’s create a model for a simulation step. To do so, initial variable creation will still happen at the green flag (such as asking the user for input and setting the respective variable to the submitted answer), but the simulation actions will take place in a simulation step that is called once all variables are initialized. </p>
                    </div>
                </div>
                <div id="conceptual" class="tab-content">
                <div class="sidebar-bttn burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <p><b>Introduction to the Conceptual Modeling:</b>  We talked about building computational models earlier to describe motion of physical objects. We also saw that computational modeling on a computer involved creating programs that represent computational models of the physical system or phenomenon that contain one or more objects. Initially, this entails identifying (or exploring) the parameters (variables) </p>
                    <img class="ImageStyle" src="img/equation.png"  width="10%" align="centre"/>
                    <p>that play a role in the system being modeled and the mechanisms or rules that govern the phenomenon (these then constitute the “algorithm” in the computational model). </p>
                    <p>Very often, especially as the phenomenon being modeled becomes complex, it is useful to generate a structure for the model that we are trying to construct. Scientists and engineers often call this an abstract representation of a problem. Why do we want to create an abstract representation of a problem before we build its computational model and study its behaviors?</p>
                    <p>The principle of abstraction is very important in programming. Through the process of abstraction, a programmer hides all but the relevant details about an object in order to reduce the complexity in its description, and also making it easier to write programs that define its behaviors.  You can see that the same issues apply when we think of modeling a science phenomena.  For example, if we are modeling the motion of an object in kinematics, the position, velocity, and acceleration of the object at any time, are important parameters or variables to describe the object’s motion. On the other hand, the shape and size of the object, its color, whether the body of the object has stripes painted on it, and who the object belongs to is irrelevant. By choosing only the relevant properties of  objects, and none of the extraneous ones makes it easier for us define the behaviors and then build computational models corresponding to these behaviors.  In C2STEM, we will adopt this practice of combining conceptual and computational modeling, to help us structure the modeling task, and make it easier for us to generate correct model behaviors. You can see that this idea is simultaneously supported as a good programming practice. So, let us adopt it as we move forward.</p>
                    <p>In C2STEM we will be utilizing a conceptual model in order to organize the variables and behaviors that define each physics simulation model. Think of conceptual modeling or creating an abstract representation also as big picture planning when constructing a model. What components of the model do we need to build simulation models for using physics concepts and principles (laws)? We do not want to overload our computational model (and we definitely don’t want to overthink/create confusion with too many possibilities!).</p>
                    <p>In the Conceptual Model tab, you will need to add an objects that are relevant to the scenario you are building the model for, and add the necessary properties and behaviors that agent will need to have in the computational model to correctly model the system behavior. </p>
                </div>
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
                <script >
                            
                    $(document).ready(function() {
                        $('.burger').click(function() {
                           $('#sidebar').toggleClass('visible');
                           $('.tab-content').toggleClass('active-nav');
                        }); 
                        $('#sidebar ul li').addClass('active');
                        $('.tab-content:not(:first)').hide();
                        $('#sidebar ul li a').click(function(event){
                            event.preventDefault();
                            var content=$(this).attr('href');
                            $(this).parent().addClass('active');
                            $(this).parent().siblings().removeClass('active');
                            $(content).show();
                            $(content).siblings('.tab-content').hide();	
                        });
                    });
                </script>
                `
            }, {
                id: 'onestep',
                type: 'cm',
                name: 'Define Your Components',
                data: 'sf_constant_velocity'

            }, {
                id: 'twostep',
                type: 'snap1',
                name: 'Develop Your Model',
                template: {
                    user: 'nicole',
                    proj: 'sf_constant_velocity'
                }

            }]
        };
    } else if (id === '1d-elaborate') {
        res = {
            parent: {
                id: '1dmotion',
                name: '1D motion'
            },
            id: id,
            name: 'Elaborate',
            tabs: [{
                id: 'desc',
                type: 'desc',
                name: 'Description',
                markup: `
                <div>
                <img class="imgFloat" src="img/sloth getting back in the loop.png"  width="20%" />
                </br>
                <p>Position is an important concept in kinematics. Other important concepts are acceleration, velocity, and speed. In the previous task, we wrote some code to position an object at a given x-coordinate. But, this does not seem to be an effective way to program the motion of a moving vehicle. In other words, we should have to write code explicitly for every meter by meter move - that would be very tedious, especially if our vehicle moved long distances! You may have learned how to write programs with loops in your previous work with Snap!, Scratch, and similar languages. In this task, we will be implementing loops in Snap! to simulate motion of an object in a more elegant way. </p>
                </div>
                </br></br></br>
                <div>
                <p><em>Knowledge Goals for This Task Include:</em></p>
                <table>
                    <tr>
                    <th>Physics</th>
                    <th>Computational</th>
                    <th>Practices</th>
                    </tr>
                    <tr>
                    <td>x<span class="descSubscript">k+1 </span>= x<span class="descSubscript">k</span> + Δx</td>
                    <td>Initializing Variables</td>
                    <td> </td>
                    </tr>
           			<tr>
           				<td> Δt (time step)</td>
           				<td>Iteration </td>
           				<td></td>
           			</tr>
           			<tr>
           				<td>Change in position within a time step: Δx = vΔt </td>
           				<td>Conditionals</td>
           				<td></td>
           			</tr>
           			<tr>
           				<td> </td>
           				<td>Input/Output</td>
           				<td></td>
           			</tr>
           			<tr>
           				<td> </td>
           				<td>Debugging</td>
           				<td></td>
           			</tr>
           			<tr>
           				<td> </td>
           				<td>Test Cases</td>
           				<td></td>
           			</tr>
           			<tr>
           				<td> </td>
           				<td>Operators and Expressions</td>
           				<td></td>
           			</tr>
                </table>
                </div>
                <p><em>Using Loops:</em> Use the code from Task 1 and extend it using a loop structure (such as “repeat until”)  to simulate the motion of an object at 1 m/s to the right, starting at  x-coordinate position 0m and moving to x-coordinate position 10m. To do so, you will need to change the x position of the sloth each time the loop repeats. Keep in mind that you will need to use an operator to determine if the x position of your sloth has moved past 10m.</p>
                <p>Code from Task One:</p>
                <div>
                <img class="imgFloat" src="img/task 1 code.png"  width="20%" />
                <iframe class="resourseiFrame" width="560" height="315" src="https://www.youtube.com/embed/k7sG87TTix0" frameborder="0" allowfullscreen></iframe>    
                </div>
                <p><em>Adjusting Time Steps:</em> This time, use a smaller time step and allow the user of your program to specify the length of the time step in seconds. This process can be similar to how you requested information for position in Task 1 in that you will need to create a new variable (called delta t) and set the variable to be the answer the user gives.</p>
                <img class="ImageStyle" src="img/change position equation.png"  width="20%" align="centre"/>
                <p><em>Which variables should be inserted into this equation in order to accurately change the position of the sloth? (Don’t forget your resources section!)</em></p>
                
                <p><em>Adding Variables:</em>Finally, let’s give the user more options. Allow user to specify additional motion variables such as velocity, starting point, and ending point of the simulation. Hint: based on the change position equation from the resources section, how would you change the “change x position by” equation using your new user requested variables to more accurately model the change of position? </p>
                <img class="ImageStyle" src="img/set variables.png"  width="17%" align="centre"/>
                <p><em>You can use these physics blocks to set the answer to your variables user requests to the relevant physics construct! </em></p>
                `
            }, {
                id: 'resource',
                type: 'desc',
                name: 'Resources',
                markup: `
                <div id="sidebar">
                    <ul>
                        <h3><strong>Resources</strong></h3>
                        <h4><strong>Physics Concepts</strong></h4>
                        <li><a href="#Speed">Speed</a></li>
                        <li><a href="#Velocity">Velocity</a></li>
                        <li><a href="#Accelaration">Accelaration</a></li>
                        <h4><strong>Computational Concepts</strong></h4>
                        <li><a href="#glossary">Glossary of Blocks</a></li>
                        <h4><strong>Practices</strong></h4>
                        <li><a href="#simulation">Simulation Model</a></li>
                        <li><a href="#conceptual">Conceptual Model</a></li>
                        
                    </ul>
                    <div class="sidebar-bttn burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                
                <div id="Speed" class="tab-content">
                    <div class="sidebar-bttn burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <p>Your interpretation of velocity is likely very similar to the scientific definition. 
                    We have all seen speed limit signs denoting a certain miles per hour rate that you cannot and should not drive above. 
                    <span><b>Speed</b></span> is a <span>scalar</span> quantity that refers to "how fast an object is moving." Speed can be thought of as the rate at which an object covers distance. 
                    A fast-moving object has a high speed and covers a relatively large distance in a short amount of time. 
                    Contrast this to a slow-moving object that has a low speed; 
                    it covers a relatively small amount of distance in the same amount of time. An object with no movement at all has a zero speed.
                    </p>
                </div>
                <div id="Velocity" class="tab-content">
                <div class="sidebar-bttn burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <p>Velocity in contrast is a vector quantity, therefore, it includes both magnitude (speed) and direction. 
                    <b>Velocity</b> is defined as "the rate at which an object changes its position." 
                    Therefore, if a person takes 3 steps to the right along the x-axis, and 1 to the left on the x-axis in one second, 
                    we compute the person’s velocity to be 2 steps/second in the x-direction. In general, velocity is defined as the change in position</p>
                    <p>divided by the time of that change. Mathematically, this can be written as: </p>
                    <p>In the above equation ▲x represents the change in position of the object in one time step, 
                    and ▲t is the length of the time step. ▲t is a special variable and an important component of a simulation step. 
                    You may not see this right away, but as you get to more complex simulations, you will see that making ▲t small will generate more accurate behaviors.
                     However, there is a tradeoff. Suppose you want to generate the behavior of your system for t seconds from the start of the simulation. 
                     t is called the simulation time. If we reduce ▲t, we may make our simulation results more accurate, but our simulation will take longer to run. 
                     Therefore, there is a tradeoff between how fast you want your simulation to complete, versus how accurate you want the simulated behaviors to be. 
                     In most situations, small changes in ▲t will not make noticeable differences in the execution time of a simulation, 
                     because computers nowadays are  quite powerful.
                    </p>
                    <img class="ImageStyle" src="img/equation.png"  width="10%" align="centre"/>
                    <p>Now, in order to accurately model the movement of our medical truck in our simulation we will need to change the position of our object (the truck) based on the set velocity. 
                    Keep this velocity equation in mind when you design your algorithm!</p>
                </div>
                <div id="Accelaration" class="tab-content">
                <div class="sidebar-bttn burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <iframe class="resourseiFrame" width="60%" height="300" src="https://www.youtube.com/embed/FOkQszg1-j8?ecver=1" frameborder="0" allowfullscreen></iframe>
                    <p>As you may have seen in the video, acceleration is defined as the rate at which velocity changes. 
                    Mathematically, this can be wriiten as:</p>
                    <img class="ImageStyle" src="img/second_equation.png"  width="10%" align="centre"/>
                    <div>
                    <img class="imgFloat" src="img/position-velocity-time.png"  width="30%" />
                    <p> where  Δv is the change in velocity over a simulation time step, and Δt is the length of the simulation time step in seconds.</p>
                    <p>To understand acceleration, study this table. In this example, the  velocity of the object changes by a constant amount every time step (second). 
                    Note how the velocity itself changes as time advances.  
                    What about the change in position over time? Think on the equation(s) used in your final velocity module as you prepare the next few tasks!</p>
                    </div>
                </div>
                <div id="glossary" class="tab-content">
                <div class="sidebar-bttn burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <p>This is third</p>
                </div>
                <div id="simulation" class="tab-content">
                <div class="sidebar-bttn burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div>
                    <p>Our goal in this project is to learn physics by building computational models. 
                    Here we will build a particular form of a computational model called a simulation model. 
                    Let us explore what we mean by a simulation model. What are its essential components?</p>
                    <p><b>Computational modeling</b> is the use of computers to simulate and study the behaviors of systems. 
                    A computational model contains variables that characterize the system being studied and the relations between those variables, expressed in a mathematical form. 
                    Computational models come in various form. One type of a computational model  is a  <b>simulation model</b>, where we model the behaviors of a system in a mathematical and logical form that can be executed as a computer program.  
                    In the current study, we will build simulation models in kinematics, 
                    which is a branch of physics where we model the motion of physical objects without considering the forces that cause the motion. </p>
                    <img class="imgFloat" src="img/simulation.png"  width="20%" />
                    <p>Since we are interested in the motion of objects, our simulation models will capture the behaviors of objects over time. 
                    There are many ways in which we can model the behavior of an object over time. 
                    One useful way is to define how the behavior of objects evolve over one time step.
                     One can then simulate or execute this model for multiple time steps to study how the behavior of the objects evolve over time. 
                     In other words, we define the model of the system for one  simulation step, and  repeat the execution for a fixed number of steps.
                      Sometimes, we can execute the simulation in an infinite loop, until a specific termination command ends the simulation.</p>
                      <p>SImulation helps us solve problems digitally on a computer, which saves us a lot of time and money, especially when we design and build complex systems like cars, aircraft, spacecraft, and power plants. Simulations also help us understand the natural and physical world, and how we may interact with the world in an effective and safe manner. To do this, we run experiments with our simulation models.</p>
                     <p> To run experiments with the model,  one can vary some of the variables of the system model, to understand how the behaviors are affected by the variable values, and also to determine what variables achieve specific outcomes. </p>
                      <p><em>Why do we care?</em>  When you are driving  a car and see a sharp bend ahead, you know you have to slow down to negotiate the bend; but how  often do you think of the deceleration needed to slow down the car to a safe speed? You may not, but the engineers who design the car do. Very often, these engineers create simulation models to study and design how to provide safe braking functions. </p>
                      <p>So far, all of our actions happen as soon as the green flag is clicked. As a means of adding more structure to the program, let’s create a model for a simulation step. To do so, initial variable creation will still happen at the green flag (such as asking the user for input and setting the respective variable to the submitted answer), but the simulation actions will take place in a simulation step that is called once all variables are initialized. </p>
                    </div>
                </div>
                <div id="conceptual" class="tab-content">
                <div class="sidebar-bttn burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <p><b>Introduction to the Conceptual Modeling:</b>  We talked about building computational models earlier to describe motion of physical objects. We also saw that computational modeling on a computer involved creating programs that represent computational models of the physical system or phenomenon that contain one or more objects. Initially, this entails identifying (or exploring) the parameters (variables) </p>
                    <img class="ImageStyle" src="img/equation.png"  width="10%" align="centre"/>
                    <p>that play a role in the system being modeled and the mechanisms or rules that govern the phenomenon (these then constitute the “algorithm” in the computational model). </p>
                    <p>Very often, especially as the phenomenon being modeled becomes complex, it is useful to generate a structure for the model that we are trying to construct. Scientists and engineers often call this an abstract representation of a problem. Why do we want to create an abstract representation of a problem before we build its computational model and study its behaviors?</p>
                    <p>The principle of abstraction is very important in programming. Through the process of abstraction, a programmer hides all but the relevant details about an object in order to reduce the complexity in its description, and also making it easier to write programs that define its behaviors.  You can see that the same issues apply when we think of modeling a science phenomena.  For example, if we are modeling the motion of an object in kinematics, the position, velocity, and acceleration of the object at any time, are important parameters or variables to describe the object’s motion. On the other hand, the shape and size of the object, its color, whether the body of the object has stripes painted on it, and who the object belongs to is irrelevant. By choosing only the relevant properties of  objects, and none of the extraneous ones makes it easier for us define the behaviors and then build computational models corresponding to these behaviors.  In C2STEM, we will adopt this practice of combining conceptual and computational modeling, to help us structure the modeling task, and make it easier for us to generate correct model behaviors. You can see that this idea is simultaneously supported as a good programming practice. So, let us adopt it as we move forward.</p>
                    <p>In C2STEM we will be utilizing a conceptual model in order to organize the variables and behaviors that define each physics simulation model. Think of conceptual modeling or creating an abstract representation also as big picture planning when constructing a model. What components of the model do we need to build simulation models for using physics concepts and principles (laws)? We do not want to overload our computational model (and we definitely don’t want to overthink/create confusion with too many possibilities!).</p>
                    <p>In the Conceptual Model tab, you will need to add an objects that are relevant to the scenario you are building the model for, and add the necessary properties and behaviors that agent will need to have in the computational model to correctly model the system behavior. </p>
                </div>
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
                <script >
                            
                    $(document).ready(function() {
                        $('.burger').click(function() {
                           $('#sidebar').toggleClass('visible');
                           $('.tab-content').toggleClass('active-nav');
                        }); 
                        $('#sidebar ul li').addClass('active');
                        $('.tab-content:not(:first)').hide();
                        $('#sidebar ul li a').click(function(event){
                            event.preventDefault();
                            var content=$(this).attr('href');
                            $(this).parent().addClass('active');
                            $(this).parent().siblings().removeClass('active');
                            $(content).show();
                            $(content).siblings('.tab-content').hide();	
                        });
                    });
                </script>
                `
            }, {
                id: 'loops',
                type: 'snap1',
                name: 'Using Loops',
                template: {
                    user: 'nicole',
                    proj: 'sf training 2a'
                },
                markup:``

            }, {
                id: 'adjustingTime',
                type: 'snap1',
                name: 'Adjusting Time Steps',
                template: {
                    user: 'nicole',
                    proj: 'sf training 2b'
                }
            }, {
                id: 'addingVariables',
                type: 'snap1',
                name: 'Adding Variables',
                template: {
                    user: 'nicole',
                    proj: 'sf training 2c'
                }
            }]
        };
    } else if (id === '1d-steps') {
        res = {
            parent: {
                id: '1dmotion',
                name: '1D motion'
            },
            id: id,
            name: 'Steps',
            tabs: [{
                id: 'desc',
                type: 'desc',
                name: 'Description',
                markup: `
                 <h4>Description:</h4> 
                   <div>
                   <img class="imgFloat" src="img/simulation steps.png"  width="10%" />
                   <p>So far, all of our actions happen as soon as the green flag is clicked. As a means of adding more structure to the program, let’s create a model for a simulation step. To do so, initial variable creation will still happen at the green flag (such as asking the user for input and setting the respective variable to the submitted answer), but the simulation actions will take place in a simulation step that is called once all variables are initialized. </p>
                   <p>For more information about the purpose of simulation steps, be sure to check our your resources section!</p>
                   </div>
                </br> </br>
                <table>
                    <tr>
                    <th>Physics</th>
                    <th>Computational</th>
                    <th>Practices</th>
                    </tr>
                    <tr>
                    <td></td>
                    <td></td>
                    <td> Utilizing a simulation step </td>
                    </tr>
                </table>
                </br>
                <p>
                   <em>Design Your Simulation Step:</em>Use your code from Part C in Task Two and add the simulation step by separating the loop component from the main block of code and setting it to begin at “simulation step.” Keep in mind that the simulation step will only run when it is called, so you must include the appropriate call to the block of code that occurs when the green flag is clicked.  
                </p>
                `
            },{
                id: 'resource',
                type: 'desc',
                name: 'Resources',
                markup: `
                <div id="sidebar">
                    <ul>
                        <h3><strong>Resources</strong></h3>
                        <h4><strong>Physics Concepts</strong></h4>
                        <li><a href="#Speed">Speed</a></li>
                        <li><a href="#Velocity">Velocity</a></li>
                        <li><a href="#Accelaration">Accelaration</a></li>
                        <h4><strong>Computational Concepts</strong></h4>
                        <li><a href="#glossary">Glossary of Blocks</a></li>
                        <h4><strong>Practices</strong></h4>
                        <li><a href="#simulation">Simulation Model</a></li>
                        <li><a href="#conceptual">Conceptual Model</a></li>
                        
                    </ul>
                    <div class="sidebar-bttn burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                
                <div id="Speed" class="tab-content">
                    <div class="sidebar-bttn burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <p>Your interpretation of velocity is likely very similar to the scientific definition. 
                    We have all seen speed limit signs denoting a certain miles per hour rate that you cannot and should not drive above. 
                    <span><b>Speed</b></span> is a <span>scalar</span> quantity that refers to "how fast an object is moving." Speed can be thought of as the rate at which an object covers distance. 
                    A fast-moving object has a high speed and covers a relatively large distance in a short amount of time. 
                    Contrast this to a slow-moving object that has a low speed; 
                    it covers a relatively small amount of distance in the same amount of time. An object with no movement at all has a zero speed.
                    </p>
                </div>
                <div id="Velocity" class="tab-content">
                <div class="sidebar-bttn burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <p>Velocity in contrast is a vector quantity, therefore, it includes both magnitude (speed) and direction. 
                    <b>Velocity</b> is defined as "the rate at which an object changes its position." 
                    Therefore, if a person takes 3 steps to the right along the x-axis, and 1 to the left on the x-axis in one second, 
                    we compute the person’s velocity to be 2 steps/second in the x-direction. In general, velocity is defined as the change in position</p>
                    <p>divided by the time of that change. Mathematically, this can be written as: </p>
                    <p>In the above equation ▲x represents the change in position of the object in one time step, 
                    and ▲t is the length of the time step. ▲t is a special variable and an important component of a simulation step. 
                    You may not see this right away, but as you get to more complex simulations, you will see that making ▲t small will generate more accurate behaviors.
                     However, there is a tradeoff. Suppose you want to generate the behavior of your system for t seconds from the start of the simulation. 
                     t is called the simulation time. If we reduce ▲t, we may make our simulation results more accurate, but our simulation will take longer to run. 
                     Therefore, there is a tradeoff between how fast you want your simulation to complete, versus how accurate you want the simulated behaviors to be. 
                     In most situations, small changes in ▲t will not make noticeable differences in the execution time of a simulation, 
                     because computers nowadays are  quite powerful.
                    </p>
                    <img class="ImageStyle" src="img/equation.png"  width="10%" align="centre"/>
                    <p>Now, in order to accurately model the movement of our medical truck in our simulation we will need to change the position of our object (the truck) based on the set velocity. 
                    Keep this velocity equation in mind when you design your algorithm!</p>
                </div>
                <div id="Accelaration" class="tab-content">
                <div class="sidebar-bttn burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <iframe class="resourseiFrame" width="60%" height="300" src="https://www.youtube.com/embed/FOkQszg1-j8?ecver=1" frameborder="0" allowfullscreen></iframe>
                    <p>As you may have seen in the video, acceleration is defined as the rate at which velocity changes. 
                    Mathematically, this can be wriiten as:</p>
                    <img class="ImageStyle" src="img/second_equation.png"  width="10%" align="centre"/>
                    <div>
                    <img class="imgFloat" src="img/position-velocity-time.png"  width="30%" />
                    <p> where  Δv is the change in velocity over a simulation time step, and Δt is the length of the simulation time step in seconds.</p>
                    <p>To understand acceleration, study this table. In this example, the  velocity of the object changes by a constant amount every time step (second). 
                    Note how the velocity itself changes as time advances.  
                    What about the change in position over time? Think on the equation(s) used in your final velocity module as you prepare the next few tasks!</p>
                    </div>
                </div>
                <div id="glossary" class="tab-content">
                <div class="sidebar-bttn burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <p>This is third</p>
                </div>
                <div id="simulation" class="tab-content">
                <div class="sidebar-bttn burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div>
                    <p>Our goal in this project is to learn physics by building computational models. 
                    Here we will build a particular form of a computational model called a simulation model. 
                    Let us explore what we mean by a simulation model. What are its essential components?</p>
                    <p><b>Computational modeling</b> is the use of computers to simulate and study the behaviors of systems. 
                    A computational model contains variables that characterize the system being studied and the relations between those variables, expressed in a mathematical form. 
                    Computational models come in various form. One type of a computational model  is a  <b>simulation model</b>, where we model the behaviors of a system in a mathematical and logical form that can be executed as a computer program.  
                    In the current study, we will build simulation models in kinematics, 
                    which is a branch of physics where we model the motion of physical objects without considering the forces that cause the motion. </p>
                    <img class="imgFloat" src="img/simulation.png"  width="20%" />
                    <p>Since we are interested in the motion of objects, our simulation models will capture the behaviors of objects over time. 
                    There are many ways in which we can model the behavior of an object over time. 
                    One useful way is to define how the behavior of objects evolve over one time step.
                     One can then simulate or execute this model for multiple time steps to study how the behavior of the objects evolve over time. 
                     In other words, we define the model of the system for one  simulation step, and  repeat the execution for a fixed number of steps.
                      Sometimes, we can execute the simulation in an infinite loop, until a specific termination command ends the simulation.</p>
                      <p>SImulation helps us solve problems digitally on a computer, which saves us a lot of time and money, especially when we design and build complex systems like cars, aircraft, spacecraft, and power plants. Simulations also help us understand the natural and physical world, and how we may interact with the world in an effective and safe manner. To do this, we run experiments with our simulation models.</p>
                     <p> To run experiments with the model,  one can vary some of the variables of the system model, to understand how the behaviors are affected by the variable values, and also to determine what variables achieve specific outcomes. </p>
                      <p><em>Why do we care?</em>  When you are driving  a car and see a sharp bend ahead, you know you have to slow down to negotiate the bend; but how  often do you think of the deceleration needed to slow down the car to a safe speed? You may not, but the engineers who design the car do. Very often, these engineers create simulation models to study and design how to provide safe braking functions. </p>
                      <p>So far, all of our actions happen as soon as the green flag is clicked. As a means of adding more structure to the program, let’s create a model for a simulation step. To do so, initial variable creation will still happen at the green flag (such as asking the user for input and setting the respective variable to the submitted answer), but the simulation actions will take place in a simulation step that is called once all variables are initialized. </p>
                    </div>
                </div>
                <div id="conceptual" class="tab-content">
                <div class="sidebar-bttn burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <p><b>Introduction to the Conceptual Modeling:</b>  We talked about building computational models earlier to describe motion of physical objects. We also saw that computational modeling on a computer involved creating programs that represent computational models of the physical system or phenomenon that contain one or more objects. Initially, this entails identifying (or exploring) the parameters (variables) </p>
                    <img class="ImageStyle" src="img/equation.png"  width="10%" align="centre"/>
                    <p>that play a role in the system being modeled and the mechanisms or rules that govern the phenomenon (these then constitute the “algorithm” in the computational model). </p>
                    <p>Very often, especially as the phenomenon being modeled becomes complex, it is useful to generate a structure for the model that we are trying to construct. Scientists and engineers often call this an abstract representation of a problem. Why do we want to create an abstract representation of a problem before we build its computational model and study its behaviors?</p>
                    <p>The principle of abstraction is very important in programming. Through the process of abstraction, a programmer hides all but the relevant details about an object in order to reduce the complexity in its description, and also making it easier to write programs that define its behaviors.  You can see that the same issues apply when we think of modeling a science phenomena.  For example, if we are modeling the motion of an object in kinematics, the position, velocity, and acceleration of the object at any time, are important parameters or variables to describe the object’s motion. On the other hand, the shape and size of the object, its color, whether the body of the object has stripes painted on it, and who the object belongs to is irrelevant. By choosing only the relevant properties of  objects, and none of the extraneous ones makes it easier for us define the behaviors and then build computational models corresponding to these behaviors.  In C2STEM, we will adopt this practice of combining conceptual and computational modeling, to help us structure the modeling task, and make it easier for us to generate correct model behaviors. You can see that this idea is simultaneously supported as a good programming practice. So, let us adopt it as we move forward.</p>
                    <p>In C2STEM we will be utilizing a conceptual model in order to organize the variables and behaviors that define each physics simulation model. Think of conceptual modeling or creating an abstract representation also as big picture planning when constructing a model. What components of the model do we need to build simulation models for using physics concepts and principles (laws)? We do not want to overload our computational model (and we definitely don’t want to overthink/create confusion with too many possibilities!).</p>
                    <p>In the Conceptual Model tab, you will need to add an objects that are relevant to the scenario you are building the model for, and add the necessary properties and behaviors that agent will need to have in the computational model to correctly model the system behavior. </p>
                </div>
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
                <script >
                            
                    $(document).ready(function() {
                        $('.burger').click(function() {
                           $('#sidebar').toggleClass('visible');
                           $('.tab-content').toggleClass('active-nav');
                        }); 
                        $('#sidebar ul li').addClass('active');
                        $('.tab-content:not(:first)').hide();
                        $('#sidebar ul li a').click(function(event){
                            event.preventDefault();
                            var content=$(this).attr('href');
                            $(this).parent().addClass('active');
                            $(this).parent().siblings().removeClass('active');
                            $(content).show();
                            $(content).siblings('.tab-content').hide();	
                        });
                    });
                </script>
                `
            }, {
                id: 'step',
                type: 'snap1',
                name: 'Design Your Simulation Step',
                template: {
                    user: 'nicole',
                    proj: 'sf training 3'
                }
            }]
        };
    } else if (id === '1d-liftoff') {
        res = {
            parent: {
                id: '1dmotion',
                name: '1D motion'
            },
            id: id,
            name: 'Introduction to Acceleration',
            tabs: [{
                id: 'desc',
                type: 'desc',
                name: 'Description',
                markup: `
                <h4>Description:</h4>
                <p>Let’s return to our sloth! Last time we saw him, we were able to change his position by using delta t and the x velocity. In the next few instructional tabs, we will introduce acceleration.</p>
                <table>
                    <tr>
                    <th>Physics</th>
                    <th>Computational</th>
                    <th>Practices</th>
                    </tr>
                    <tr>
                    <td>base-change: x<span class="descSubscript">k+1</span>= x<span class="descSubscript">k</span> + Δx</td>
                    <td>iteration</td>
                    <td> </td>
                    </tr>
           			<tr>
           				<td> position-velocity-time: Δx = vΔt</td>
           				<td>initializing variables</td>
           				<td></td>
           			</tr>
           			<tr>
           				<td>base-change: v<span class="descSubscript">k+1</span> = v<span class="descSubscript">k</span> + Δv </td>
           				<td>conditionals</td>
           				<td></td>
           			</tr>
           			<tr>
           				<td> velocity-acceleration-time: Δv = aΔt</td>
           				<td></td>
           				<td></td>
           			</tr>
                </table>
                <p><em>Accelerate:</em> Simulate the motion of the object to the right at a rate of 1 m/s from coordinate -10m to coordinate 10m, as you have done previously. This time, extend the program you created to define the motion of the sloth to include the change in velocity over time, and determine the velocity and position of the sloth after 10 seconds.</p>
                <img class="ImageStyle" src="img/change velocity.png"  width="20%" align="centre"/>
            `
            }, {
                id: 'resource',
                type: 'desc',
                name: 'Resources',
                markup: `
                <div id="sidebar">
                    <ul>
                        <h3><strong>Resources</strong></h3>
                        <h4><strong>Physics Concepts</strong></h4>
                        <li><a href="#Speed">Speed</a></li>
                        <li><a href="#Velocity">Velocity</a></li>
                        <li><a href="#Accelaration">Accelaration</a></li>
                        <h4><strong>Computational Concepts</strong></h4>
                        <li><a href="#glossary">Glossary of Blocks</a></li>
                        <h4><strong>Practices</strong></h4>
                        <li><a href="#simulation">Simulation Model</a></li>
                        <li><a href="#conceptual">Conceptual Model</a></li>
                        
                    </ul>
                    <div class="sidebar-bttn burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                
                <div id="Speed" class="tab-content">
                    <div class="sidebar-bttn burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <p>Your interpretation of velocity is likely very similar to the scientific definition. 
                    We have all seen speed limit signs denoting a certain miles per hour rate that you cannot and should not drive above. 
                    <span><b>Speed</b></span> is a <span>scalar</span> quantity that refers to "how fast an object is moving." Speed can be thought of as the rate at which an object covers distance. 
                    A fast-moving object has a high speed and covers a relatively large distance in a short amount of time. 
                    Contrast this to a slow-moving object that has a low speed; 
                    it covers a relatively small amount of distance in the same amount of time. An object with no movement at all has a zero speed.
                    </p>
                </div>
                <div id="Velocity" class="tab-content">
                <div class="sidebar-bttn burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <p>Velocity in contrast is a vector quantity, therefore, it includes both magnitude (speed) and direction. 
                    <b>Velocity</b> is defined as "the rate at which an object changes its position." 
                    Therefore, if a person takes 3 steps to the right along the x-axis, and 1 to the left on the x-axis in one second, 
                    we compute the person’s velocity to be 2 steps/second in the x-direction. In general, velocity is defined as the change in position</p>
                    <p>divided by the time of that change. Mathematically, this can be written as: </p>
                    <p>In the above equation ▲x represents the change in position of the object in one time step, 
                    and ▲t is the length of the time step. ▲t is a special variable and an important component of a simulation step. 
                    You may not see this right away, but as you get to more complex simulations, you will see that making ▲t small will generate more accurate behaviors.
                     However, there is a tradeoff. Suppose you want to generate the behavior of your system for t seconds from the start of the simulation. 
                     t is called the simulation time. If we reduce ▲t, we may make our simulation results more accurate, but our simulation will take longer to run. 
                     Therefore, there is a tradeoff between how fast you want your simulation to complete, versus how accurate you want the simulated behaviors to be. 
                     In most situations, small changes in ▲t will not make noticeable differences in the execution time of a simulation, 
                     because computers nowadays are  quite powerful.
                    </p>
                    <img class="ImageStyle" src="img/equation.png"  width="10%" align="centre"/>
                    <p>Now, in order to accurately model the movement of our medical truck in our simulation we will need to change the position of our object (the truck) based on the set velocity. 
                    Keep this velocity equation in mind when you design your algorithm!</p>
                </div>
                <div id="Accelaration" class="tab-content">
                <div class="sidebar-bttn burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <iframe class="resourseiFrame" width="60%" height="300" src="https://www.youtube.com/embed/FOkQszg1-j8?ecver=1" frameborder="0" allowfullscreen></iframe>
                    <p>As you may have seen in the video, acceleration is defined as the rate at which velocity changes. 
                    Mathematically, this can be wriiten as:</p>
                    <img class="ImageStyle" src="img/second_equation.png"  width="10%" align="centre"/>
                    <div>
                    <img class="imgFloat" src="img/position-velocity-time.png"  width="30%" />
                    <p> where  Δv is the change in velocity over a simulation time step, and Δt is the length of the simulation time step in seconds.</p>
                    <p>To understand acceleration, study this table. In this example, the  velocity of the object changes by a constant amount every time step (second). 
                    Note how the velocity itself changes as time advances.  
                    What about the change in position over time? Think on the equation(s) used in your final velocity module as you prepare the next few tasks!</p>
                    </div>
                </div>
                <div id="glossary" class="tab-content">
                <div class="sidebar-bttn burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <p>This is third</p>
                </div>
                <div id="simulation" class="tab-content">
                <div class="sidebar-bttn burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div>
                    <p>Our goal in this project is to learn physics by building computational models. 
                    Here we will build a particular form of a computational model called a simulation model. 
                    Let us explore what we mean by a simulation model. What are its essential components?</p>
                    <p><b>Computational modeling</b> is the use of computers to simulate and study the behaviors of systems. 
                    A computational model contains variables that characterize the system being studied and the relations between those variables, expressed in a mathematical form. 
                    Computational models come in various form. One type of a computational model  is a  <b>simulation model</b>, where we model the behaviors of a system in a mathematical and logical form that can be executed as a computer program.  
                    In the current study, we will build simulation models in kinematics, 
                    which is a branch of physics where we model the motion of physical objects without considering the forces that cause the motion. </p>
                    <img class="imgFloat" src="img/simulation.png"  width="20%" />
                    <p>Since we are interested in the motion of objects, our simulation models will capture the behaviors of objects over time. 
                    There are many ways in which we can model the behavior of an object over time. 
                    One useful way is to define how the behavior of objects evolve over one time step.
                     One can then simulate or execute this model for multiple time steps to study how the behavior of the objects evolve over time. 
                     In other words, we define the model of the system for one  simulation step, and  repeat the execution for a fixed number of steps.
                      Sometimes, we can execute the simulation in an infinite loop, until a specific termination command ends the simulation.</p>
                      <p>SImulation helps us solve problems digitally on a computer, which saves us a lot of time and money, especially when we design and build complex systems like cars, aircraft, spacecraft, and power plants. Simulations also help us understand the natural and physical world, and how we may interact with the world in an effective and safe manner. To do this, we run experiments with our simulation models.</p>
                     <p> To run experiments with the model,  one can vary some of the variables of the system model, to understand how the behaviors are affected by the variable values, and also to determine what variables achieve specific outcomes. </p>
                      <p><em>Why do we care?</em>  When you are driving  a car and see a sharp bend ahead, you know you have to slow down to negotiate the bend; but how  often do you think of the deceleration needed to slow down the car to a safe speed? You may not, but the engineers who design the car do. Very often, these engineers create simulation models to study and design how to provide safe braking functions. </p>
                      <p>So far, all of our actions happen as soon as the green flag is clicked. As a means of adding more structure to the program, let’s create a model for a simulation step. To do so, initial variable creation will still happen at the green flag (such as asking the user for input and setting the respective variable to the submitted answer), but the simulation actions will take place in a simulation step that is called once all variables are initialized. </p>
                    </div>
                </div>
                <div id="conceptual" class="tab-content">
                <div class="sidebar-bttn burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <p><b>Introduction to the Conceptual Modeling:</b>  We talked about building computational models earlier to describe motion of physical objects. We also saw that computational modeling on a computer involved creating programs that represent computational models of the physical system or phenomenon that contain one or more objects. Initially, this entails identifying (or exploring) the parameters (variables) </p>
                    <img class="ImageStyle" src="img/equation.png"  width="10%" align="centre"/>
                    <p>that play a role in the system being modeled and the mechanisms or rules that govern the phenomenon (these then constitute the “algorithm” in the computational model). </p>
                    <p>Very often, especially as the phenomenon being modeled becomes complex, it is useful to generate a structure for the model that we are trying to construct. Scientists and engineers often call this an abstract representation of a problem. Why do we want to create an abstract representation of a problem before we build its computational model and study its behaviors?</p>
                    <p>The principle of abstraction is very important in programming. Through the process of abstraction, a programmer hides all but the relevant details about an object in order to reduce the complexity in its description, and also making it easier to write programs that define its behaviors.  You can see that the same issues apply when we think of modeling a science phenomena.  For example, if we are modeling the motion of an object in kinematics, the position, velocity, and acceleration of the object at any time, are important parameters or variables to describe the object’s motion. On the other hand, the shape and size of the object, its color, whether the body of the object has stripes painted on it, and who the object belongs to is irrelevant. By choosing only the relevant properties of  objects, and none of the extraneous ones makes it easier for us define the behaviors and then build computational models corresponding to these behaviors.  In C2STEM, we will adopt this practice of combining conceptual and computational modeling, to help us structure the modeling task, and make it easier for us to generate correct model behaviors. You can see that this idea is simultaneously supported as a good programming practice. So, let us adopt it as we move forward.</p>
                    <p>In C2STEM we will be utilizing a conceptual model in order to organize the variables and behaviors that define each physics simulation model. Think of conceptual modeling or creating an abstract representation also as big picture planning when constructing a model. What components of the model do we need to build simulation models for using physics concepts and principles (laws)? We do not want to overload our computational model (and we definitely don’t want to overthink/create confusion with too many possibilities!).</p>
                    <p>In the Conceptual Model tab, you will need to add an objects that are relevant to the scenario you are building the model for, and add the necessary properties and behaviors that agent will need to have in the computational model to correctly model the system behavior. </p>
                </div>
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
                <script >
                            
                    $(document).ready(function() {
                        $('.burger').click(function() {
                           $('#sidebar').toggleClass('visible');
                           $('.tab-content').toggleClass('active-nav');
                        }); 
                        $('#sidebar ul li').addClass('active');
                        $('.tab-content:not(:first)').hide();
                        $('#sidebar ul li a').click(function(event){
                            event.preventDefault();
                            var content=$(this).attr('href');
                            $(this).parent().addClass('active');
                            $(this).parent().siblings().removeClass('active');
                            $(content).show();
                            $(content).siblings('.tab-content').hide();	
                        });
                    });
                </script>
                `
            },{
                id: 'Accel',
                type: 'snap1',
                name: 'Accelerate the Sloth',
                template: {
                    user: 'nicole',
                    proj: 'sf accel 1'
                }
            }]
        };
    } else if (id === '1d-PVT') {
        res = {
            parent: {
                id: '1dmotion',
                name: '1D motion'
            },
            id: id,
            name: 'Position-Velocity-Time',
            tabs: [{
                id: 'desc',
                type: 'desc',
                name: 'Description',
                markup: `
                <h4>Description:</h4>
                <div>
                <img class="imgFloat" src="img/position-velocity-time.png"  width="20%" />
                <p>In the last task, we effectively used a simulation time step (t) of 1 second. What happens if we decrease the time step to say, 0.5 sec. The table on the left illustrates. Does it change our velocity and position  equations? </p>
                <p>Adjust Time Step: Similarly to the Instructional Tasks for 1D Velocity, we will now introduce a smaller time step. To do so, create a ▲t variable in which the user will input a value for ▲t. Study what happens to the velocity versus time and position versus time plots as you vary the value of ▲t.  Remember we had discussed that the simulation results become more accurate. Does this experiment demonstrate that? Explain.</p>
                </div>
                </br></br> </br></br>
                <table>
                    <tr>
                    <th>Physics</th>
                    <th>Computational</th>
                    <th>Practices</th>
                    </tr>
                    <tr>
                    <td>Δt</td>
                    <td>Mathematical relationships</td>
                    <td> </td>
                    </tr>
           			<tr>
           				<td> variable definitions</td>
           				<td>operators and expressions</td>
           				<td></td>
           			</tr>
           			<tr>
           				<td>position-velocity-time: Δx = vΔt</td>
           				<td>input output</td>
           				<td></td>
           			</tr>
           			<tr>
           				<td></td>
           				<td>conditionals</td>
           				<td></td>
           			</tr>
           			<tr>
           				<td></td>
           				<td>debugging and test cases</td>
           				<td></td>
           			</tr>
                </table>
               `
            }, {
                id: 'resource',
                type: 'desc',
                name: 'Resources',
                markup: `
                <div id="sidebar">
                    <ul>
                        <h3><strong>Resources</strong></h3>
                        <h4><strong>Physics Concepts</strong></h4>
                        <li><a href="#Speed">Speed</a></li>
                        <li><a href="#Velocity">Velocity</a></li>
                        <li><a href="#Accelaration">Accelaration</a></li>
                        <h4><strong>Computational Concepts</strong></h4>
                        <li><a href="#glossary">Glossary of Blocks</a></li>
                        <h4><strong>Practices</strong></h4>
                        <li><a href="#simulation">Simulation Model</a></li>
                        <li><a href="#conceptual">Conceptual Model</a></li>
                        
                    </ul>
                    <div class="sidebar-bttn burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                
                <div id="Speed" class="tab-content">
                    <div class="sidebar-bttn burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <p>Your interpretation of velocity is likely very similar to the scientific definition. 
                    We have all seen speed limit signs denoting a certain miles per hour rate that you cannot and should not drive above. 
                    <span><b>Speed</b></span> is a <span>scalar</span> quantity that refers to "how fast an object is moving." Speed can be thought of as the rate at which an object covers distance. 
                    A fast-moving object has a high speed and covers a relatively large distance in a short amount of time. 
                    Contrast this to a slow-moving object that has a low speed; 
                    it covers a relatively small amount of distance in the same amount of time. An object with no movement at all has a zero speed.
                    </p>
                </div>
                <div id="Velocity" class="tab-content">
                <div class="sidebar-bttn burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <p>Velocity in contrast is a vector quantity, therefore, it includes both magnitude (speed) and direction. 
                    <b>Velocity</b> is defined as "the rate at which an object changes its position." 
                    Therefore, if a person takes 3 steps to the right along the x-axis, and 1 to the left on the x-axis in one second, 
                    we compute the person’s velocity to be 2 steps/second in the x-direction. In general, velocity is defined as the change in position</p>
                    <p>divided by the time of that change. Mathematically, this can be written as: </p>
                    <p>In the above equation ▲x represents the change in position of the object in one time step, 
                    and ▲t is the length of the time step. ▲t is a special variable and an important component of a simulation step. 
                    You may not see this right away, but as you get to more complex simulations, you will see that making ▲t small will generate more accurate behaviors.
                     However, there is a tradeoff. Suppose you want to generate the behavior of your system for t seconds from the start of the simulation. 
                     t is called the simulation time. If we reduce ▲t, we may make our simulation results more accurate, but our simulation will take longer to run. 
                     Therefore, there is a tradeoff between how fast you want your simulation to complete, versus how accurate you want the simulated behaviors to be. 
                     In most situations, small changes in ▲t will not make noticeable differences in the execution time of a simulation, 
                     because computers nowadays are  quite powerful.
                    </p>
                    <img class="ImageStyle" src="img/equation.png"  width="10%" align="centre"/>
                    <p>Now, in order to accurately model the movement of our medical truck in our simulation we will need to change the position of our object (the truck) based on the set velocity. 
                    Keep this velocity equation in mind when you design your algorithm!</p>
                </div>
                <div id="Accelaration" class="tab-content">
                <div class="sidebar-bttn burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <iframe class="resourseiFrame" width="60%" height="300" src="https://www.youtube.com/embed/FOkQszg1-j8?ecver=1" frameborder="0" allowfullscreen></iframe>
                    <p>As you may have seen in the video, acceleration is defined as the rate at which velocity changes. 
                    Mathematically, this can be wriiten as:</p>
                    <img class="ImageStyle" src="img/second_equation.png"  width="10%" align="centre"/>
                    <div>
                    <img class="imgFloat" src="img/position-velocity-time.png"  width="30%" />
                    <p> where  Δv is the change in velocity over a simulation time step, and Δt is the length of the simulation time step in seconds.</p>
                    <p>To understand acceleration, study this table. In this example, the  velocity of the object changes by a constant amount every time step (second). 
                    Note how the velocity itself changes as time advances.  
                    What about the change in position over time? Think on the equation(s) used in your final velocity module as you prepare the next few tasks!</p>
                    </div>
                </div>
                <div id="glossary" class="tab-content">
                <div class="sidebar-bttn burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <p>This is third</p>
                </div>
                <div id="simulation" class="tab-content">
                <div class="sidebar-bttn burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div>
                    <p>Our goal in this project is to learn physics by building computational models. 
                    Here we will build a particular form of a computational model called a simulation model. 
                    Let us explore what we mean by a simulation model. What are its essential components?</p>
                    <p><b>Computational modeling</b> is the use of computers to simulate and study the behaviors of systems. 
                    A computational model contains variables that characterize the system being studied and the relations between those variables, expressed in a mathematical form. 
                    Computational models come in various form. One type of a computational model  is a  <b>simulation model</b>, where we model the behaviors of a system in a mathematical and logical form that can be executed as a computer program.  
                    In the current study, we will build simulation models in kinematics, 
                    which is a branch of physics where we model the motion of physical objects without considering the forces that cause the motion. </p>
                    <img class="imgFloat" src="img/simulation.png"  width="20%" />
                    <p>Since we are interested in the motion of objects, our simulation models will capture the behaviors of objects over time. 
                    There are many ways in which we can model the behavior of an object over time. 
                    One useful way is to define how the behavior of objects evolve over one time step.
                     One can then simulate or execute this model for multiple time steps to study how the behavior of the objects evolve over time. 
                     In other words, we define the model of the system for one  simulation step, and  repeat the execution for a fixed number of steps.
                      Sometimes, we can execute the simulation in an infinite loop, until a specific termination command ends the simulation.</p>
                      <p>SImulation helps us solve problems digitally on a computer, which saves us a lot of time and money, especially when we design and build complex systems like cars, aircraft, spacecraft, and power plants. Simulations also help us understand the natural and physical world, and how we may interact with the world in an effective and safe manner. To do this, we run experiments with our simulation models.</p>
                     <p> To run experiments with the model,  one can vary some of the variables of the system model, to understand how the behaviors are affected by the variable values, and also to determine what variables achieve specific outcomes. </p>
                      <p><em>Why do we care?</em>  When you are driving  a car and see a sharp bend ahead, you know you have to slow down to negotiate the bend; but how  often do you think of the deceleration needed to slow down the car to a safe speed? You may not, but the engineers who design the car do. Very often, these engineers create simulation models to study and design how to provide safe braking functions. </p>
                      <p>So far, all of our actions happen as soon as the green flag is clicked. As a means of adding more structure to the program, let’s create a model for a simulation step. To do so, initial variable creation will still happen at the green flag (such as asking the user for input and setting the respective variable to the submitted answer), but the simulation actions will take place in a simulation step that is called once all variables are initialized. </p>
                    </div>
                </div>
                <div id="conceptual" class="tab-content">
                <div class="sidebar-bttn burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <p><b>Introduction to the Conceptual Modeling:</b>  We talked about building computational models earlier to describe motion of physical objects. We also saw that computational modeling on a computer involved creating programs that represent computational models of the physical system or phenomenon that contain one or more objects. Initially, this entails identifying (or exploring) the parameters (variables) </p>
                    <img class="ImageStyle" src="img/equation.png"  width="10%" align="centre"/>
                    <p>that play a role in the system being modeled and the mechanisms or rules that govern the phenomenon (these then constitute the “algorithm” in the computational model). </p>
                    <p>Very often, especially as the phenomenon being modeled becomes complex, it is useful to generate a structure for the model that we are trying to construct. Scientists and engineers often call this an abstract representation of a problem. Why do we want to create an abstract representation of a problem before we build its computational model and study its behaviors?</p>
                    <p>The principle of abstraction is very important in programming. Through the process of abstraction, a programmer hides all but the relevant details about an object in order to reduce the complexity in its description, and also making it easier to write programs that define its behaviors.  You can see that the same issues apply when we think of modeling a science phenomena.  For example, if we are modeling the motion of an object in kinematics, the position, velocity, and acceleration of the object at any time, are important parameters or variables to describe the object’s motion. On the other hand, the shape and size of the object, its color, whether the body of the object has stripes painted on it, and who the object belongs to is irrelevant. By choosing only the relevant properties of  objects, and none of the extraneous ones makes it easier for us define the behaviors and then build computational models corresponding to these behaviors.  In C2STEM, we will adopt this practice of combining conceptual and computational modeling, to help us structure the modeling task, and make it easier for us to generate correct model behaviors. You can see that this idea is simultaneously supported as a good programming practice. So, let us adopt it as we move forward.</p>
                    <p>In C2STEM we will be utilizing a conceptual model in order to organize the variables and behaviors that define each physics simulation model. Think of conceptual modeling or creating an abstract representation also as big picture planning when constructing a model. What components of the model do we need to build simulation models for using physics concepts and principles (laws)? We do not want to overload our computational model (and we definitely don’t want to overthink/create confusion with too many possibilities!).</p>
                    <p>In the Conceptual Model tab, you will need to add an objects that are relevant to the scenario you are building the model for, and add the necessary properties and behaviors that agent will need to have in the computational model to correctly model the system behavior. </p>
                </div>
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
                <script >
                            
                    $(document).ready(function() {
                        $('.burger').click(function() {
                           $('#sidebar').toggleClass('visible');
                           $('.tab-content').toggleClass('active-nav');
                        }); 
                        $('#sidebar ul li').addClass('active');
                        $('.tab-content:not(:first)').hide();
                        $('#sidebar ul li a').click(function(event){
                            event.preventDefault();
                            var content=$(this).attr('href');
                            $(this).parent().addClass('active');
                            $(this).parent().siblings().removeClass('active');
                            $(content).show();
                            $(content).siblings('.tab-content').hide();	
                        });
                    });
                </script>
                `
            },{
                id: 'AccelTime',
                type: 'snap1',
                name: 'Adjust Time Step',
                template: {
                    user: 'nicole',
                    proj: 'sf accel 2'
                }
            }]
        };
    } else if (id === '1d-velocitychange') {
        res = {
            parent: {
                id: '1dmotion',
                name: '1D motion'
            },
            id: id,
            name: 'Velocity Change Rate',
            tabs: [{
                id: 'desc',
                type: 'desc',
                name: 'Description',
                markup: `
                <h4>Description:</h4>
                <p>So we have been studying the effect of acceleration on the motion of objects. Acceleration is the rate of change of velocity, therefore if velocity is measured in meters per second, acceleration would have the units meters per second per second, which is often abbreviated as meters per second squared.  </p>
                <p>Let’s study acceleration and velocity in a little more detail. The examples we have looked at earlier, all deal with an object speeding up over time. In other words, because acceleration is positive, the velocity increases over time, therefore, the object speeds up. So what would be the acceleration if an object were slowing down, for example in the table above let’s say the acceleration is -1 meters/second, therefore, velocity decreases by 1 meter/second at every time step (1 second).</p>
                <p><em>Velocity Change Rate:</em>  Rewrite your sloth movement program, where the sloth starts from rest and speeds up by 1 m/s for 5 seconds, and then slows down by 1m/s for 5 seconds. What is the velocity and position of the sloth after 10 seconds? What about 15 seconds?</p>
                <p><em>Plotting the Change:</em> Try another example -- the sloth starts from rest and speeds up by 1 m/s every second for 5 seconds; then for 3 seconds the sloth slows down by 1 m/sec for every second.  After that the sloth decides to cruise, i.e., it stops speeding up and slowing down. What is the  velocity and position of the sloth after 10 seconds? After 15 seconds? Plot the acceleration, velocity, and position versus time plots, and explain what you see in the plots.</p> 
                <table>
                    <tr>
                    <th>Physics</th>
                    <th>Computational</th>
                    <th>Practices</th>
                    </tr>
                    <tr>
                    <td>Δt</td>
                    <td>Mathematical relationships</td>
                    <td> </td>
                    </tr>
           			<tr>
           				<td> base-change: x<span class="descSubscript">k+1 </span>= x<span class="descSubscript">k</span> + Δx</td>
           				<td>operators and expressions</td>
           				<td></td>
           			</tr>
           			<tr>
           				<td>position-velocity-time: Δx = vΔt</td>
           				<td>input output</td>
           				<td></td>
           			</tr>
           			<tr>
           				<td></td>
           				<td>conditionals</td>
           				<td></td>
           			</tr>
           			<tr>
           				<td></td>
           				<td>debugging</td>
           				<td></td>
           			</tr>
           			<tr>
           				<td></td>
           				<td> test cases</td>
           				<td></td>
           			</tr>
                </table>
               `
            }, {
                id: 'resource',
                type: 'desc',
                name: 'Resources',
                markup: `
                <div id="sidebar">
                    <ul>
                        <h3><strong>Resources</strong></h3>
                        <h4><strong>Physics Concepts</strong></h4>
                        <li><a href="#Speed">Speed</a></li>
                        <li><a href="#Velocity">Velocity</a></li>
                        <li><a href="#Accelaration">Accelaration</a></li>
                        <h4><strong>Computational Concepts</strong></h4>
                        <li><a href="#glossary">Glossary of Blocks</a></li>
                        <h4><strong>Practices</strong></h4>
                        <li><a href="#simulation">Simulation Model</a></li>
                        <li><a href="#conceptual">Conceptual Model</a></li>
                        
                    </ul>
                    <div class="sidebar-bttn burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                
                <div id="Speed" class="tab-content">
                    <div class="sidebar-bttn burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <p>Your interpretation of velocity is likely very similar to the scientific definition. 
                    We have all seen speed limit signs denoting a certain miles per hour rate that you cannot and should not drive above. 
                    <span><b>Speed</b></span> is a <span>scalar</span> quantity that refers to "how fast an object is moving." Speed can be thought of as the rate at which an object covers distance. 
                    A fast-moving object has a high speed and covers a relatively large distance in a short amount of time. 
                    Contrast this to a slow-moving object that has a low speed; 
                    it covers a relatively small amount of distance in the same amount of time. An object with no movement at all has a zero speed.
                    </p>
                </div>
                <div id="Velocity" class="tab-content">
                <div class="sidebar-bttn burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <p>Velocity in contrast is a vector quantity, therefore, it includes both magnitude (speed) and direction. 
                    <b>Velocity</b> is defined as "the rate at which an object changes its position." 
                    Therefore, if a person takes 3 steps to the right along the x-axis, and 1 to the left on the x-axis in one second, 
                    we compute the person’s velocity to be 2 steps/second in the x-direction. In general, velocity is defined as the change in position</p>
                    <p>divided by the time of that change. Mathematically, this can be written as: </p>
                    <p>In the above equation ▲x represents the change in position of the object in one time step, 
                    and ▲t is the length of the time step. ▲t is a special variable and an important component of a simulation step. 
                    You may not see this right away, but as you get to more complex simulations, you will see that making ▲t small will generate more accurate behaviors.
                     However, there is a tradeoff. Suppose you want to generate the behavior of your system for t seconds from the start of the simulation. 
                     t is called the simulation time. If we reduce ▲t, we may make our simulation results more accurate, but our simulation will take longer to run. 
                     Therefore, there is a tradeoff between how fast you want your simulation to complete, versus how accurate you want the simulated behaviors to be. 
                     In most situations, small changes in ▲t will not make noticeable differences in the execution time of a simulation, 
                     because computers nowadays are  quite powerful.
                    </p>
                    <img class="ImageStyle" src="img/equation.png"  width="10%" align="centre"/>
                    <p>Now, in order to accurately model the movement of our medical truck in our simulation we will need to change the position of our object (the truck) based on the set velocity. 
                    Keep this velocity equation in mind when you design your algorithm!</p>
                </div>
                <div id="Accelaration" class="tab-content">
                <div class="sidebar-bttn burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <iframe class="resourseiFrame" width="60%" height="300" src="https://www.youtube.com/embed/FOkQszg1-j8?ecver=1" frameborder="0" allowfullscreen></iframe>
                    <p>As you may have seen in the video, acceleration is defined as the rate at which velocity changes. 
                    Mathematically, this can be wriiten as:</p>
                    <img class="ImageStyle" src="img/second_equation.png"  width="10%" align="centre"/>
                    <div>
                    <img class="imgFloat" src="img/position-velocity-time.png"  width="30%" />
                    <p> where  Δv is the change in velocity over a simulation time step, and Δt is the length of the simulation time step in seconds.</p>
                    <p>To understand acceleration, study this table. In this example, the  velocity of the object changes by a constant amount every time step (second). 
                    Note how the velocity itself changes as time advances.  
                    What about the change in position over time? Think on the equation(s) used in your final velocity module as you prepare the next few tasks!</p>
                    </div>
                </div>
                <div id="glossary" class="tab-content">
                <div class="sidebar-bttn burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <p>This is third</p>
                </div>
                <div id="simulation" class="tab-content">
                <div class="sidebar-bttn burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div>
                    <p>Our goal in this project is to learn physics by building computational models. 
                    Here we will build a particular form of a computational model called a simulation model. 
                    Let us explore what we mean by a simulation model. What are its essential components?</p>
                    <p><b>Computational modeling</b> is the use of computers to simulate and study the behaviors of systems. 
                    A computational model contains variables that characterize the system being studied and the relations between those variables, expressed in a mathematical form. 
                    Computational models come in various form. One type of a computational model  is a  <b>simulation model</b>, where we model the behaviors of a system in a mathematical and logical form that can be executed as a computer program.  
                    In the current study, we will build simulation models in kinematics, 
                    which is a branch of physics where we model the motion of physical objects without considering the forces that cause the motion. </p>
                    <img class="imgFloat" src="img/simulation.png"  width="20%" />
                    <p>Since we are interested in the motion of objects, our simulation models will capture the behaviors of objects over time. 
                    There are many ways in which we can model the behavior of an object over time. 
                    One useful way is to define how the behavior of objects evolve over one time step.
                     One can then simulate or execute this model for multiple time steps to study how the behavior of the objects evolve over time. 
                     In other words, we define the model of the system for one  simulation step, and  repeat the execution for a fixed number of steps.
                      Sometimes, we can execute the simulation in an infinite loop, until a specific termination command ends the simulation.</p>
                      <p>SImulation helps us solve problems digitally on a computer, which saves us a lot of time and money, especially when we design and build complex systems like cars, aircraft, spacecraft, and power plants. Simulations also help us understand the natural and physical world, and how we may interact with the world in an effective and safe manner. To do this, we run experiments with our simulation models.</p>
                     <p> To run experiments with the model,  one can vary some of the variables of the system model, to understand how the behaviors are affected by the variable values, and also to determine what variables achieve specific outcomes. </p>
                      <p><em>Why do we care?</em>  When you are driving  a car and see a sharp bend ahead, you know you have to slow down to negotiate the bend; but how  often do you think of the deceleration needed to slow down the car to a safe speed? You may not, but the engineers who design the car do. Very often, these engineers create simulation models to study and design how to provide safe braking functions. </p>
                      <p>So far, all of our actions happen as soon as the green flag is clicked. As a means of adding more structure to the program, let’s create a model for a simulation step. To do so, initial variable creation will still happen at the green flag (such as asking the user for input and setting the respective variable to the submitted answer), but the simulation actions will take place in a simulation step that is called once all variables are initialized. </p>
                    </div>
                </div>
                <div id="conceptual" class="tab-content">
                <div class="sidebar-bttn burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <p><b>Introduction to the Conceptual Modeling:</b>  We talked about building computational models earlier to describe motion of physical objects. We also saw that computational modeling on a computer involved creating programs that represent computational models of the physical system or phenomenon that contain one or more objects. Initially, this entails identifying (or exploring) the parameters (variables) </p>
                    <img class="ImageStyle" src="img/equation.png"  width="10%" align="centre"/>
                    <p>that play a role in the system being modeled and the mechanisms or rules that govern the phenomenon (these then constitute the “algorithm” in the computational model). </p>
                    <p>Very often, especially as the phenomenon being modeled becomes complex, it is useful to generate a structure for the model that we are trying to construct. Scientists and engineers often call this an abstract representation of a problem. Why do we want to create an abstract representation of a problem before we build its computational model and study its behaviors?</p>
                    <p>The principle of abstraction is very important in programming. Through the process of abstraction, a programmer hides all but the relevant details about an object in order to reduce the complexity in its description, and also making it easier to write programs that define its behaviors.  You can see that the same issues apply when we think of modeling a science phenomena.  For example, if we are modeling the motion of an object in kinematics, the position, velocity, and acceleration of the object at any time, are important parameters or variables to describe the object’s motion. On the other hand, the shape and size of the object, its color, whether the body of the object has stripes painted on it, and who the object belongs to is irrelevant. By choosing only the relevant properties of  objects, and none of the extraneous ones makes it easier for us define the behaviors and then build computational models corresponding to these behaviors.  In C2STEM, we will adopt this practice of combining conceptual and computational modeling, to help us structure the modeling task, and make it easier for us to generate correct model behaviors. You can see that this idea is simultaneously supported as a good programming practice. So, let us adopt it as we move forward.</p>
                    <p>In C2STEM we will be utilizing a conceptual model in order to organize the variables and behaviors that define each physics simulation model. Think of conceptual modeling or creating an abstract representation also as big picture planning when constructing a model. What components of the model do we need to build simulation models for using physics concepts and principles (laws)? We do not want to overload our computational model (and we definitely don’t want to overthink/create confusion with too many possibilities!).</p>
                    <p>In the Conceptual Model tab, you will need to add an objects that are relevant to the scenario you are building the model for, and add the necessary properties and behaviors that agent will need to have in the computational model to correctly model the system behavior. </p>
                </div>
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
                <script >
                            
                    $(document).ready(function() {
                        $('.burger').click(function() {
                           $('#sidebar').toggleClass('visible');
                           $('.tab-content').toggleClass('active-nav');
                        }); 
                        $('#sidebar ul li').addClass('active');
                        $('.tab-content:not(:first)').hide();
                        $('#sidebar ul li a').click(function(event){
                            event.preventDefault();
                            var content=$(this).attr('href');
                            $(this).parent().addClass('active');
                            $(this).parent().siblings().removeClass('active');
                            $(content).show();
                            $(content).siblings('.tab-content').hide();	
                        });
                    });
                </script>
                `
            },{
                id: 'VelocityChange',
                type: 'snap1',
                name: 'Include Velocity Change Rate',
                template: {
                    user: 'nicole',
                    proj: 'sf accel 3'
                }
            },{
                id: 'PlottingChange',
                type: 'snap1',
                name: 'Plotting the Change',
                template: {
                    user: 'nicole',
                    proj: 'sf accel 3b'
                }
            }]
        };
    } else if (id === '1d-stop') {
        res = {
            parent: {
                id: '1dmotion',
                name: '1D motion'
            },
            id: id,
            name: 'Model Building -1D Acceleration: Make Your Truck Stop',
            tabs: [{
                id: 'desc',
                type: 'desc',
                name: 'Description',
                markup: `
                <h2>Description: </h2>
                <p>
                You’ve demonstrated your ability to compute the movement of objects as a function of their acceleration and velocity. In addition, you have modeled behaviors over time using loops, and then as a simulation model with a simulation time step, ▲t. In addition, we have studied how to systematically build models by combining  conceptual and computational modeling. Now it is up to you to combine your skills and to simulate 1-dimensional motion of an object! 
                </p>
                <p><b>The Task:</b>  Consider a  bus as an object that has already been placed at a specific position (x = -57m), but it is at rest. You must program your bus to start, maintain a target speed (15m/s), and slow down at an appropriate distance away from the stop sign to ensure that it to safely stop at the given stop sign. </p>
                <iframe class="resourseiFrame" width="60%" height="400" src="https://www.youtube.com/embed/jbNHoTl-MLo" frameborder="0" allowfullscreen></iframe>
                `
            },  {
                id: 'resource',
                type: 'desc',
                name: 'Resources',
                markup: `
                <div id="sidebar">
                    <ul>
                        <h3><strong>Resources</strong></h3>
                        <h4><strong>Physics Concepts</strong></h4>
                        <li><a href="#Speed">Speed</a></li>
                        <li><a href="#Velocity">Velocity</a></li>
                        <li><a href="#Accelaration">Accelaration</a></li>
                        <h4><strong>Computational Concepts</strong></h4>
                        <li><a href="#glossary">Glossary of Blocks</a></li>
                        <h4><strong>Practices</strong></h4>
                        <li><a href="#simulation">Simulation Model</a></li>
                        <li><a href="#conceptual">Conceptual Model</a></li>
                        
                    </ul>
                    <div class="sidebar-bttn burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                
                <div id="Speed" class="tab-content">
                    <div class="sidebar-bttn burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <p>Your interpretation of velocity is likely very similar to the scientific definition. 
                    We have all seen speed limit signs denoting a certain miles per hour rate that you cannot and should not drive above. 
                    <span><b>Speed</b></span> is a <span>scalar</span> quantity that refers to "how fast an object is moving." Speed can be thought of as the rate at which an object covers distance. 
                    A fast-moving object has a high speed and covers a relatively large distance in a short amount of time. 
                    Contrast this to a slow-moving object that has a low speed; 
                    it covers a relatively small amount of distance in the same amount of time. An object with no movement at all has a zero speed.
                    </p>
                </div>
                <div id="Velocity" class="tab-content">
                <div class="sidebar-bttn burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <p>Velocity in contrast is a vector quantity, therefore, it includes both magnitude (speed) and direction. 
                    <b>Velocity</b> is defined as "the rate at which an object changes its position." 
                    Therefore, if a person takes 3 steps to the right along the x-axis, and 1 to the left on the x-axis in one second, 
                    we compute the person’s velocity to be 2 steps/second in the x-direction. In general, velocity is defined as the change in position</p>
                    <p>divided by the time of that change. Mathematically, this can be written as: </p>
                    <p>In the above equation ▲x represents the change in position of the object in one time step, 
                    and ▲t is the length of the time step. ▲t is a special variable and an important component of a simulation step. 
                    You may not see this right away, but as you get to more complex simulations, you will see that making ▲t small will generate more accurate behaviors.
                     However, there is a tradeoff. Suppose you want to generate the behavior of your system for t seconds from the start of the simulation. 
                     t is called the simulation time. If we reduce ▲t, we may make our simulation results more accurate, but our simulation will take longer to run. 
                     Therefore, there is a tradeoff between how fast you want your simulation to complete, versus how accurate you want the simulated behaviors to be. 
                     In most situations, small changes in ▲t will not make noticeable differences in the execution time of a simulation, 
                     because computers nowadays are  quite powerful.
                    </p>
                    <img class="ImageStyle" src="img/equation.png"  width="10%" align="centre"/>
                    <p>Now, in order to accurately model the movement of our medical truck in our simulation we will need to change the position of our object (the truck) based on the set velocity. 
                    Keep this velocity equation in mind when you design your algorithm!</p>
                </div>
                <div id="Accelaration" class="tab-content">
                <div class="sidebar-bttn burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <iframe class="resourseiFrame" width="60%" height="300" src="https://www.youtube.com/embed/FOkQszg1-j8?ecver=1" frameborder="0" allowfullscreen></iframe>
                    <p>As you may have seen in the video, acceleration is defined as the rate at which velocity changes. 
                    Mathematically, this can be wriiten as:</p>
                    <img class="ImageStyle" src="img/second_equation.png"  width="10%" align="centre"/>
                    <div>
                    <img class="imgFloat" src="img/position-velocity-time.png"  width="30%" />
                    <p> where  Δv is the change in velocity over a simulation time step, and Δt is the length of the simulation time step in seconds.</p>
                    <p>To understand acceleration, study this table. In this example, the  velocity of the object changes by a constant amount every time step (second). 
                    Note how the velocity itself changes as time advances.  
                    What about the change in position over time? Think on the equation(s) used in your final velocity module as you prepare the next few tasks!</p>
                    </div>
                </div>
                <div id="glossary" class="tab-content">
                <div class="sidebar-bttn burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <p>This is third</p>
                </div>
                <div id="simulation" class="tab-content">
                <div class="sidebar-bttn burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div>
                    <p>Our goal in this project is to learn physics by building computational models. 
                    Here we will build a particular form of a computational model called a simulation model. 
                    Let us explore what we mean by a simulation model. What are its essential components?</p>
                    <p><b>Computational modeling</b> is the use of computers to simulate and study the behaviors of systems. 
                    A computational model contains variables that characterize the system being studied and the relations between those variables, expressed in a mathematical form. 
                    Computational models come in various form. One type of a computational model  is a  <b>simulation model</b>, where we model the behaviors of a system in a mathematical and logical form that can be executed as a computer program.  
                    In the current study, we will build simulation models in kinematics, 
                    which is a branch of physics where we model the motion of physical objects without considering the forces that cause the motion. </p>
                    <img class="imgFloat" src="img/simulation.png"  width="20%" />
                    <p>Since we are interested in the motion of objects, our simulation models will capture the behaviors of objects over time. 
                    There are many ways in which we can model the behavior of an object over time. 
                    One useful way is to define how the behavior of objects evolve over one time step.
                     One can then simulate or execute this model for multiple time steps to study how the behavior of the objects evolve over time. 
                     In other words, we define the model of the system for one  simulation step, and  repeat the execution for a fixed number of steps.
                      Sometimes, we can execute the simulation in an infinite loop, until a specific termination command ends the simulation.</p>
                      <p>SImulation helps us solve problems digitally on a computer, which saves us a lot of time and money, especially when we design and build complex systems like cars, aircraft, spacecraft, and power plants. Simulations also help us understand the natural and physical world, and how we may interact with the world in an effective and safe manner. To do this, we run experiments with our simulation models.</p>
                     <p> To run experiments with the model,  one can vary some of the variables of the system model, to understand how the behaviors are affected by the variable values, and also to determine what variables achieve specific outcomes. </p>
                      <p><em>Why do we care?</em>  When you are driving  a car and see a sharp bend ahead, you know you have to slow down to negotiate the bend; but how  often do you think of the deceleration needed to slow down the car to a safe speed? You may not, but the engineers who design the car do. Very often, these engineers create simulation models to study and design how to provide safe braking functions. </p>
                      <p>So far, all of our actions happen as soon as the green flag is clicked. As a means of adding more structure to the program, let’s create a model for a simulation step. To do so, initial variable creation will still happen at the green flag (such as asking the user for input and setting the respective variable to the submitted answer), but the simulation actions will take place in a simulation step that is called once all variables are initialized. </p>
                    </div>
                </div>
                <div id="conceptual" class="tab-content">
                <div class="sidebar-bttn burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <p><b>Introduction to the Conceptual Modeling:</b>  We talked about building computational models earlier to describe motion of physical objects. We also saw that computational modeling on a computer involved creating programs that represent computational models of the physical system or phenomenon that contain one or more objects. Initially, this entails identifying (or exploring) the parameters (variables) </p>
                    <img class="ImageStyle" src="img/equation.png"  width="10%" align="centre"/>
                    <p>that play a role in the system being modeled and the mechanisms or rules that govern the phenomenon (these then constitute the “algorithm” in the computational model). </p>
                    <p>Very often, especially as the phenomenon being modeled becomes complex, it is useful to generate a structure for the model that we are trying to construct. Scientists and engineers often call this an abstract representation of a problem. Why do we want to create an abstract representation of a problem before we build its computational model and study its behaviors?</p>
                    <p>The principle of abstraction is very important in programming. Through the process of abstraction, a programmer hides all but the relevant details about an object in order to reduce the complexity in its description, and also making it easier to write programs that define its behaviors.  You can see that the same issues apply when we think of modeling a science phenomena.  For example, if we are modeling the motion of an object in kinematics, the position, velocity, and acceleration of the object at any time, are important parameters or variables to describe the object’s motion. On the other hand, the shape and size of the object, its color, whether the body of the object has stripes painted on it, and who the object belongs to is irrelevant. By choosing only the relevant properties of  objects, and none of the extraneous ones makes it easier for us define the behaviors and then build computational models corresponding to these behaviors.  In C2STEM, we will adopt this practice of combining conceptual and computational modeling, to help us structure the modeling task, and make it easier for us to generate correct model behaviors. You can see that this idea is simultaneously supported as a good programming practice. So, let us adopt it as we move forward.</p>
                    <p>In C2STEM we will be utilizing a conceptual model in order to organize the variables and behaviors that define each physics simulation model. Think of conceptual modeling or creating an abstract representation also as big picture planning when constructing a model. What components of the model do we need to build simulation models for using physics concepts and principles (laws)? We do not want to overload our computational model (and we definitely don’t want to overthink/create confusion with too many possibilities!).</p>
                    <p>In the Conceptual Model tab, you will need to add an objects that are relevant to the scenario you are building the model for, and add the necessary properties and behaviors that agent will need to have in the computational model to correctly model the system behavior. </p>
                </div>
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
                <script >
                            
                    $(document).ready(function() {
                        $('.burger').click(function() {
                           $('#sidebar').toggleClass('visible');
                           $('.tab-content').toggleClass('active-nav');
                        }); 
                        $('#sidebar ul li').addClass('active');
                        $('.tab-content:not(:first)').hide();
                        $('#sidebar ul li a').click(function(event){
                            event.preventDefault();
                            var content=$(this).attr('href');
                            $(this).parent().addClass('active');
                            $(this).parent().siblings().removeClass('active');
                            $(content).show();
                            $(content).siblings('.tab-content').hide();	
                        });
                    });
                </script>
                `
            }, {
                id: 'truckStop',
                type: 'cm',
                name: 'Define Your Components',
                data: 'sf_stop_truck'

            }, {
                id: 'stopAccel',
                type: 'snap1',
                name: 'Model 1D Acceleration',
                template: {
                    user: 'nicole',
                    proj: 'sf_stop_truck'
                }

            }]
        };
    }else if (id === '1d-deliver') {
        res = {
            parent: {
                id: '1dmotion',
                name: '1D motion'
            },
            id: id,
            name: 'Challenge Problem: Deliver the Medicine to the River!',
            tabs: [{
                id: 'desc',
                type: 'desc',
                name: 'Description',
                markup: `
                <h2>Description: </h2>
                <p><em>The Challenge:</em>Time to complete the first part of our journey (green) in Brazil. The truck should begin at rest on the road at the far left side of the stage. Given the map and the environment speed limits, program the medical truck to start at an initial location and accurately arrive at the final destination along the Amazon river.</p>
                <img class="ImageStyle" src="img/1dchallenge.png"  width="20%" align="centre"/>`
            },  {
                id: 'resource',
                type: 'desc',
                name: 'Resources',
                markup: `
                <div id="sidebar">
                    <ul>
                        <h3><strong>Resources</strong></h3>
                        <h4><strong>Physics Concepts</strong></h4>
                        <li><a href="#Speed">Speed</a></li>
                        <li><a href="#Velocity">Velocity</a></li>
                        <li><a href="#Accelaration">Accelaration</a></li>
                        <h4><strong>Computational Concepts</strong></h4>
                        <li><a href="#glossary">Glossary of Blocks</a></li>
                        <h4><strong>Practices</strong></h4>
                        <li><a href="#simulation">Simulation Model</a></li>
                        <li><a href="#conceptual">Conceptual Model</a></li>
                        
                    </ul>
                    <div class="sidebar-bttn burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                
                <div id="Speed" class="tab-content">
                    <div class="sidebar-bttn burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <p>Your interpretation of velocity is likely very similar to the scientific definition. 
                    We have all seen speed limit signs denoting a certain miles per hour rate that you cannot and should not drive above. 
                    <span><b>Speed</b></span> is a <span>scalar</span> quantity that refers to "how fast an object is moving." Speed can be thought of as the rate at which an object covers distance. 
                    A fast-moving object has a high speed and covers a relatively large distance in a short amount of time. 
                    Contrast this to a slow-moving object that has a low speed; 
                    it covers a relatively small amount of distance in the same amount of time. An object with no movement at all has a zero speed.
                    </p>
                </div>
                <div id="Velocity" class="tab-content">
                <div class="sidebar-bttn burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <p>Velocity in contrast is a vector quantity, therefore, it includes both magnitude (speed) and direction. 
                    <b>Velocity</b> is defined as "the rate at which an object changes its position." 
                    Therefore, if a person takes 3 steps to the right along the x-axis, and 1 to the left on the x-axis in one second, 
                    we compute the person’s velocity to be 2 steps/second in the x-direction. In general, velocity is defined as the change in position</p>
                    <p>divided by the time of that change. Mathematically, this can be written as: </p>
                    <p>In the above equation ▲x represents the change in position of the object in one time step, 
                    and ▲t is the length of the time step. ▲t is a special variable and an important component of a simulation step. 
                    You may not see this right away, but as you get to more complex simulations, you will see that making ▲t small will generate more accurate behaviors.
                     However, there is a tradeoff. Suppose you want to generate the behavior of your system for t seconds from the start of the simulation. 
                     t is called the simulation time. If we reduce ▲t, we may make our simulation results more accurate, but our simulation will take longer to run. 
                     Therefore, there is a tradeoff between how fast you want your simulation to complete, versus how accurate you want the simulated behaviors to be. 
                     In most situations, small changes in ▲t will not make noticeable differences in the execution time of a simulation, 
                     because computers nowadays are  quite powerful.
                    </p>
                    <img class="ImageStyle" src="img/equation.png"  width="10%" align="centre"/>
                    <p>Now, in order to accurately model the movement of our medical truck in our simulation we will need to change the position of our object (the truck) based on the set velocity. 
                    Keep this velocity equation in mind when you design your algorithm!</p>
                </div>
                <div id="Accelaration" class="tab-content">
                <div class="sidebar-bttn burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <iframe class="resourseiFrame" width="60%" height="300" src="https://www.youtube.com/embed/FOkQszg1-j8?ecver=1" frameborder="0" allowfullscreen></iframe>
                    <p>As you may have seen in the video, acceleration is defined as the rate at which velocity changes. 
                    Mathematically, this can be wriiten as:</p>
                    <img class="ImageStyle" src="img/second_equation.png"  width="10%" align="centre"/>
                    <div>
                    <img class="imgFloat" src="img/position-velocity-time.png"  width="30%" />
                    <p> where  Δv is the change in velocity over a simulation time step, and Δt is the length of the simulation time step in seconds.</p>
                    <p>To understand acceleration, study this table. In this example, the  velocity of the object changes by a constant amount every time step (second). 
                    Note how the velocity itself changes as time advances.  
                    What about the change in position over time? Think on the equation(s) used in your final velocity module as you prepare the next few tasks!</p>
                    </div>
                </div>
                <div id="glossary" class="tab-content">
                <div class="sidebar-bttn burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <p>This is third</p>
                </div>
                <div id="simulation" class="tab-content">
                <div class="sidebar-bttn burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <div>
                    <p>Our goal in this project is to learn physics by building computational models. 
                    Here we will build a particular form of a computational model called a simulation model. 
                    Let us explore what we mean by a simulation model. What are its essential components?</p>
                    <p><b>Computational modeling</b> is the use of computers to simulate and study the behaviors of systems. 
                    A computational model contains variables that characterize the system being studied and the relations between those variables, expressed in a mathematical form. 
                    Computational models come in various form. One type of a computational model  is a  <b>simulation model</b>, where we model the behaviors of a system in a mathematical and logical form that can be executed as a computer program.  
                    In the current study, we will build simulation models in kinematics, 
                    which is a branch of physics where we model the motion of physical objects without considering the forces that cause the motion. </p>
                    <img class="imgFloat" src="img/simulation.png"  width="20%" />
                    <p>Since we are interested in the motion of objects, our simulation models will capture the behaviors of objects over time. 
                    There are many ways in which we can model the behavior of an object over time. 
                    One useful way is to define how the behavior of objects evolve over one time step.
                     One can then simulate or execute this model for multiple time steps to study how the behavior of the objects evolve over time. 
                     In other words, we define the model of the system for one  simulation step, and  repeat the execution for a fixed number of steps.
                      Sometimes, we can execute the simulation in an infinite loop, until a specific termination command ends the simulation.</p>
                      <p>SImulation helps us solve problems digitally on a computer, which saves us a lot of time and money, especially when we design and build complex systems like cars, aircraft, spacecraft, and power plants. Simulations also help us understand the natural and physical world, and how we may interact with the world in an effective and safe manner. To do this, we run experiments with our simulation models.</p>
                     <p> To run experiments with the model,  one can vary some of the variables of the system model, to understand how the behaviors are affected by the variable values, and also to determine what variables achieve specific outcomes. </p>
                      <p><em>Why do we care?</em>  When you are driving  a car and see a sharp bend ahead, you know you have to slow down to negotiate the bend; but how  often do you think of the deceleration needed to slow down the car to a safe speed? You may not, but the engineers who design the car do. Very often, these engineers create simulation models to study and design how to provide safe braking functions. </p>
                      <p>So far, all of our actions happen as soon as the green flag is clicked. As a means of adding more structure to the program, let’s create a model for a simulation step. To do so, initial variable creation will still happen at the green flag (such as asking the user for input and setting the respective variable to the submitted answer), but the simulation actions will take place in a simulation step that is called once all variables are initialized. </p>
                    </div>
                </div>
                <div id="conceptual" class="tab-content">
                <div class="sidebar-bttn burger">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                    <p><b>Introduction to the Conceptual Modeling:</b>  We talked about building computational models earlier to describe motion of physical objects. We also saw that computational modeling on a computer involved creating programs that represent computational models of the physical system or phenomenon that contain one or more objects. Initially, this entails identifying (or exploring) the parameters (variables) </p>
                    <img class="ImageStyle" src="img/equation.png"  width="10%" align="centre"/>
                    <p>that play a role in the system being modeled and the mechanisms or rules that govern the phenomenon (these then constitute the “algorithm” in the computational model). </p>
                    <p>Very often, especially as the phenomenon being modeled becomes complex, it is useful to generate a structure for the model that we are trying to construct. Scientists and engineers often call this an abstract representation of a problem. Why do we want to create an abstract representation of a problem before we build its computational model and study its behaviors?</p>
                    <p>The principle of abstraction is very important in programming. Through the process of abstraction, a programmer hides all but the relevant details about an object in order to reduce the complexity in its description, and also making it easier to write programs that define its behaviors.  You can see that the same issues apply when we think of modeling a science phenomena.  For example, if we are modeling the motion of an object in kinematics, the position, velocity, and acceleration of the object at any time, are important parameters or variables to describe the object’s motion. On the other hand, the shape and size of the object, its color, whether the body of the object has stripes painted on it, and who the object belongs to is irrelevant. By choosing only the relevant properties of  objects, and none of the extraneous ones makes it easier for us define the behaviors and then build computational models corresponding to these behaviors.  In C2STEM, we will adopt this practice of combining conceptual and computational modeling, to help us structure the modeling task, and make it easier for us to generate correct model behaviors. You can see that this idea is simultaneously supported as a good programming practice. So, let us adopt it as we move forward.</p>
                    <p>In C2STEM we will be utilizing a conceptual model in order to organize the variables and behaviors that define each physics simulation model. Think of conceptual modeling or creating an abstract representation also as big picture planning when constructing a model. What components of the model do we need to build simulation models for using physics concepts and principles (laws)? We do not want to overload our computational model (and we definitely don’t want to overthink/create confusion with too many possibilities!).</p>
                    <p>In the Conceptual Model tab, you will need to add an objects that are relevant to the scenario you are building the model for, and add the necessary properties and behaviors that agent will need to have in the computational model to correctly model the system behavior. </p>
                </div>
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
                <script >
                            
                    $(document).ready(function() {
                        $('.burger').click(function() {
                           $('#sidebar').toggleClass('visible');
                           $('.tab-content').toggleClass('active-nav');
                        }); 
                        $('#sidebar ul li').addClass('active');
                        $('.tab-content:not(:first)').hide();
                        $('#sidebar ul li a').click(function(event){
                            event.preventDefault();
                            var content=$(this).attr('href');
                            $(this).parent().addClass('active');
                            $(this).parent().siblings().removeClass('active');
                            $(content).show();
                            $(content).siblings('.tab-content').hide();	
                        });
                    });
                </script>
                `
            }, {
                id: 'Challengecm',
                type: 'cm',
                name: 'Define Your Components',
                data: 'sf_land_challenge'

            }, {
                id: 'Challengecomp',
                type: 'snap1',
                name: 'Complete Challenge One',
                template: {
                    user: 'nicole',
                    proj: 'sf_stop_truck'
                }

            }]
        };
    }else {
        res = {
            parent: {
                id: 'unknown',
                name: 'Unknown module'
            },
            id: 'unknown',
            name: 'Unknown task',
            tabs: []
        }
    }

    // hack, to make sure that we are logged in
    this.login(null, null, null, function (err) {
        callback(err, err ? null : res);
    });
}