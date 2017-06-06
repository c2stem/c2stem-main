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
            }
            , {
                id: '1d-PVT',
                name: 'Instructional Task - 1D Acceleration: Position-Velocity-Time'
            },{
                id: '1d-velocitychange',
                name: 'Instructional Task - 1D Acceleration: Velocity Change Rate'
            },{
                id: '1d-stop',
                name: 'Model Building -1D Acceleration: Make Your Truck Stop'
            },{
                id: '1d-deliver',
                name: 'Challenge Problem: Deliver the Medicine to the River! '
            },{
                id: '1d-assessment',
                name: 'Assessment Task'
            }
            ]
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
                markup: '<iframe id=desc_resourceIframe  src="task-descriptions/1D-module/1D-develop_simple_motion_simulation.html" frameborder="0"></iframe>'
            },  {
                id: 'resource',
                type: 'desc',
                name: 'Resources',
                markup: '<iframe id=desc_resourceIframe  src="resources.html" frameborder="0"></iframe>'
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
                markup: '<iframe id=desc_resourceIframe  src="task-descriptions/1D-module/1D-simulate_the_motion_of_a_truck.html" frameborder="0"></iframe>'
            },  {
                id: 'resource',
                type: 'desc',
                name: 'Resources',
                markup: '<iframe id=desc_resourceIframe  src="resources.html" frameborder="0"></iframe>'
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
                markup: '<iframe id=desc_resourceIframe  src="task-descriptions/1D-module/1D-elaborate_your_simulation.html" frameborder="0"></iframe>'
            }, {
                id: 'resource',
                type: 'desc',
                name: 'Resources',
                markup: '<iframe id=desc_resourceIframe  src="resources.html" frameborder="0"></iframe>'
            }, {
                id: 'loops',
                type: 'snap1',
                name: 'Using Loops',
                template: {
                    user: 'nicole',
                    proj: 'sf training 2a'
                }


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
                markup: '<iframe id=desc_resourceIframe  src="task-descriptions/1D-module/1D-use_a_simulation_step.html" frameborder="0"></iframe>'
            },{
                id: 'resource',
                type: 'desc',
                name: 'Resources',
                markup:'<iframe id=desc_resourceIframe  src="resources.html" frameborder="0"></iframe>'
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
                markup: '<iframe id=desc_resourceIframe  src="task-descriptions/1D-module/1D-introduction_to_acceleration.html" frameborder="0"></iframe>'
            }, {
                id: 'resource',
                type: 'desc',
                name: 'Resources',
                markup: '<iframe id=desc_resourceIframe  src="resources.html" frameborder="0"></iframe>'
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
                markup:'<iframe id=desc_resourceIframe  src="task-descriptions/1D-module/1D-PVT.html" frameborder="0"></iframe>'
            }, {
                id: 'resource',
                type: 'desc',
                name: 'Resources',
                markup: '<iframe id=desc_resourceIframe  src="resources.html" frameborder="0"></iframe>'
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
                markup: '<iframe id=desc_resourceIframe  src="task-descriptions/1D-module/1D-velocity_change_rate.html" frameborder="0"></iframe>'
            }, {
                id: 'resource',
                type: 'desc',
                name: 'Resources',
                markup: '<iframe id=desc_resourceIframe  src="resources.html" frameborder="0"></iframe>'
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
                markup: '<iframe id=desc_resourceIframe  src="task-descriptions/1D-module/1D-truck_stop.html" frameborder="0"></iframe>'
            },  {
                id: 'resource',
                type: 'desc',
                name: 'Resources',
                markup: '<iframe id=desc_resourceIframe  src="resources.html" frameborder="0"></iframe>'
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
                markup: '<iframe id=desc_resourceIframe  src="task-descriptions/1D-module/1D-deliver.html" frameborder="0"></iframe>'
            },  {
                id: 'resource',
                type: 'desc',
                name: 'Resources',
                markup: '<iframe id=desc_resourceIframe  src="resources.html" frameborder="0"></iframe>'
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
    }else if (id === '1d-assessment') {
        res = {
            parent: {
                id: '1dmotion',
                name: '1D motion'
            },
            id: id,
            name: 'Assessment Task',
            tabs: [{
                id: 'assessment',
                type: 'desc',
                name: 'Assessment',
                markup: '<iframe id=desc_resourceIframe  src="assessment.html" frameborder="0"></iframe>'
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