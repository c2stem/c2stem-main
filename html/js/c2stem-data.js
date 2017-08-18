C2Stem.prototype.loadHomeData = function (callback) {
    var res = {
        modules: [{
            id: 'training',
            name: "Training",
            icon: "img/spiral.jpg"
        },{
            id: '1dmotion',
            name: "1D: Land",
            icon: "img/truck.jpg"
        }, {
            id: 'm2',
            name: "2D: Water",
            icon: "img/boat.jpg"
        }, {
            id: 'm3',
            name: "2D: Air",
            icon: "img/drone.jpg"
        }, {
            id: 'm4',
            name: "Challenge",
            icon: "img/para.jpg"
        }]
    };

    // hack, to make sure that we are logged in
    this.login(null, null, null, function (err) {
        callback(err, err ? null : res);
    });
}

C2Stem.prototype.loadModuleData = function (id, callback) {
    var res;

    if (id === 'training') {
        res = {
            id: id,
            name: 'Training',
            tasks: [{
                id: 'training-basics',
                name: 'Instructional Task - Playing with Shapes'
            }
            ]
        };
    } else if (id === '1dmotion') {
            res = {
                id: id,
                name: '1D: Land',
                tasks: [/*{
                    id: '1d-basics',
                    name: 'Instructional Task - Develop Simple Motion Simulation'
                },*/ {
                    id: '1d-elaborate',
                    name: 'Instructional Task - 1D Velocity: Simulate Physics Phenomena'
                },/*{
                    id: '1d-inst_conceptual',
                    name: 'Instructional Task - 1D Velocity: Model Planning'
                }, {
                    id: '1d-checkin1',
                    name: 'Check-In #1'
                },*/ {
                    id: '1d-constant',
                    name: 'Model Building - 1D Velocity: Simulate the Motion of a Truck'
                },/* {
                    id: '1d-checkin2',
                    name: 'Check-In #2'
                },*/ {
                    id: '1d-liftoff',
                    name: 'Instructional Task - 1D Acceleration: Changing Velocity'
                },/* {
                    id: '1d-checkin3',
                    name: 'Check-In #3'
                },*/ {
                    id: '1d-stop',
                    name: 'Model Building -1D Acceleration: Make Your Truck Stop'
                }, /*{
                id: '1d-checkin4',
                name: 'Check-In #4'
            },*/ {
                    id: '1d-deliver',
                    name: 'Challenge Problem: Deliver the Medicine to the River! '
                }
                ]
            };
    } else if (id === 'm2') {
        res = {
            id: id,
            name: '2D: Water',
            tasks: [{
                id: '2d-basics',
                name: 'Instructional Task: Motion of a Boat in a River'
            }, {
                id: '2d-inst_cross',
                name: 'Instructional Task: Crossing the River'
            }, {
                id: '2d-checkin1',
                name: 'Check-In #1'
            }, {
                id: '2d-mb_cross',
                name: 'Model Building - Crossing the River to Get to the Airstrip'
            }, {
                id: '2d-checkin2',
                name: 'Check-In #2'
            }, {
                id: '2d-river_challenge',
                name: 'Challenge: The Uncertain Amazon River'
            }]
        };
    } else if (id === 'm3') {
        res = {
            id: id,
            name: '2D: Air',
            tasks: [{
                id: 'air-basics',
                name: 'Instructional Task: Ready, Aim → Drop'
            }, {
                id: 'air-inst_drop',
                name: 'Instructional Task: Drop While Moving'
            }, {
                id: 'air-checkin1',
                name: 'Check-In #1'
            }, {
                id: 'air-mb_drop',
                name: 'Model Building - Two Moving Drops at Different Altitudes'
            }, {
                id: 'air-checkin2',
                name: 'Check-In #2'
            }, {
                id: 'air-challenge',
                name: 'Challenge: Moving on Up!'
            }]
        };
    } else if (id === 'm4') {
        res = {
            id: id,
            name: 'Challenge',
            tasks: [{
            id: 'para-challenge',
            name: 'Challenge: Parachute Drop!'
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

    if (id === 'training-basics') {
        res = {
            parent: {
                id: 'training',
                name: 'Training'
            },
            id: id,
            name: 'Instructional Task - Playing with Shapes',
            tabs: [{
                id: 'desc',
                type: 'desc',
                name: 'Description',
                markup: '<iframe id=desc_resourceIframe  src="task-descriptions/training/training-step1.html" frameborder="0"></iframe>'
            }, {
                id: 'onestep',
                type: 'snap1',
                name: 'BUILD',
                template: {
                    user: 'nicole',
                    proj: 'sf-training_basics'
                }
            }, {
                id: 'resource',
                type: 'desc',
                name: 'Resources',
                markup: '<iframe id=desc_resourceIframe  src="resources.html" frameborder="0"></iframe>'
            }]
        };
    } else if (id === '1d-basics') {
        res = {
            parent: {
                id: '1dmotion',
                name: '1D: Land'
            },
            id: id,
            name: 'Instructional Task - Develop Simple Motion Simulation',
            tabs: [{
                id: 'desc',
                type: 'desc',
                name: 'Description',
                markup: '<iframe id=desc_resourceIframe  src="task-descriptions/1D-module/1D-develop_simple_motion_simulation.html" frameborder="0"></iframe>'
            }, {
                id: 'onestep',
                type: 'snap1',
                name: 'BUILD',
                template: {
                    user: 'nicole',
                    proj: 'sf training 1a'
                }
            }, {
                id: 'resource',
                type: 'desc',
                name: 'Resources',
                markup: '<iframe id=desc_resourceIframe  src="resources.html" frameborder="0"></iframe>'
            }]
        };
    } else if (id === '1d-elaborate') {
        res = {
            parent: {
                id: '1dmotion',
                name: '1D: Land'
            },
            id: id,
            name: 'Instructional Task - 1D Velocity: Simulate Physics Phenomena',
            tabs: [{
                id: 'desc',
                type: 'desc',
                name: 'Description',
                markup: '<iframe id=desc_resourceIframe  src="task-descriptions/1D-module/1D-simulate_physics_phenomena.html" frameborder="0"></iframe>'
                /*markup: '<iframe id=desc_resourceIframe  src="task-descriptions/1D-module/1D-simulate_physics_phenomena.html" frameborder="0"></iframe>'*/
            }, {
                id: 'loops',
                type: 'snap1',
                name: 'BUILD',
                template: {
                    user: 'nicole',
                    proj: 'sf training 2a'
                }
            }, {
                id: 'resource',
                type: 'desc',
                name: 'Resources',
                markup: '<iframe id=desc_resourceIframe  src="resources.html" frameborder="0"></iframe>'
            }]
        };
    }else if (id === '1d-checkin1') {
        res = {
            parent: {
                id: '1dmotion',
                name: '1D: Land'
            },
            id: id,
            name: 'Check-In #1',
            tabs: [{
                id: 'assessment',
                type: 'desc',
                name: 'Assessment',
                markup: '<iframe id=desc_resourceIframe  src="assessments/assessment1.1.html" frameborder="0"></iframe>'
            }, {
                id: 'assess',
                type: 'snap1',
                name: 'Task_1.1',
                template: {
                    user: 'Naveed',
                    proj: 'Module1_1.1'
                }
            }]
        };
    } else if (id === '1d-inst_conceptual') {
        res = {
            parent: {
                id: '1dmotion',
                name: '1D: Land'
            },
            id: id,
            name: 'Instructional Task - 1D Velocity: Model Planning',
            tabs: [{
                id: 'desc',
                type: 'desc',
                name: 'Description',
                markup: '<iframe id=desc_resourceIframe  src="task-descriptions/1D-module/1D-use_a_simulation_step.html" frameborder="0"></iframe>'
            }, {
                id: 'resource',
                type: 'desc',
                name: 'Resources',
                markup: '<iframe id=desc_resourceIframe  src="resources.html" frameborder="0"></iframe>'
            }]
        };
    } else if (id === '1d-constant') {
        res = {
            parent: {
                id: '1dmotion',
                name: '1D: Land'
            },
            id: id,
            name: 'Model Building - 1D Velocity: Constant Velocity',
            tabs: [{
                id: 'desc',
                type: 'desc',
                name: 'Description',
                markup: '<iframe id=desc_resourceIframe  src="task-descriptions/1D-module/1D-simulate_the_motion_of_a_truck.html" frameborder="0"></iframe>'
            }, {
                id: 'onestep',
                type: 'cm',
                name: 'PLAN',
                data: 'sf_constant_velocity'
            }, {
                id: 'twostep',
                type: 'snap1',
                name: 'BUILD',
                template: {
                    user: 'nicole',
                    proj: 'sf_constant_velocity'
                }
            }, {
                id: 'resource',
                type: 'desc',
                name: 'Resources',
                markup: '<iframe id=desc_resourceIframe  src="resources.html" frameborder="0"></iframe>'
            }]
        };
    }else if (id === '1d-checkin2') {
        res = {
            parent: {
                id: '1dmotion',
                name: '1D: Land'
            },
            id: id,
            name: 'Check-In #2',
            tabs: [{
                id: 'assessment',
                type: 'desc',
                name: 'Assessment',
                markup: '<iframe id=desc_resourceIframe  src="assessments/assessment1.2.html" frameborder="0"></iframe>'
            }, {
                id: 'assess',
                type: 'snap1',
                name: 'Task_1.2',
                template: {
                    user: 'Naveed',
                    proj: 'Module1_2.1'
                }
            }]
        };
    } else if (id === '1d-liftoff') {
        res = {
            parent: {
                id: '1dmotion',
                name: '1D: Land'
            },
            id: id,
            name: 'Instructional Task - 1D Acceleration: Changing Velocity',
            tabs: [{
                id: 'desc',
                type: 'desc',
                name: 'Description',
                markup: '<iframe id=desc_resourceIframe  src="task-descriptions/1D-module/1D-aug4_intro_to_acceleration.html" frameborder="0"></iframe>'
                /*markup: '<iframe id=desc_resourceIframe  src="task-descriptions/1D-module/1D-introduction_to_acceleration.html" frameborder="0"></iframe>'*/
            }, {
                id: 'slothAccel',
                type: 'cm',
                name: 'PLAN',
                data: 'sf_intro_acceleration'
            }, {
                id: 'Accel',
                type: 'snap1',
                name: 'BUILD',
                template: {
                    user: 'nicole',
                    proj: 'sf accel 1'
                }
            }, {
                id: 'resource',
                type: 'desc',
                name: 'Resources',
                markup: '<iframe id=desc_resourceIframe  src="resources.html" frameborder="0"></iframe>'
            }]
        };
    }else if (id === '1d-checkin3') {
        res = {
            parent: {
                id: '1dmotion',
                name: '1D: Land'
            },
            id: id,
            name: 'Check-In #3',
            tabs: [{
                id: 'assessment',
                type: 'desc',
                name: 'Assessment',
                markup: '<iframe id=desc_resourceIframe  src="assessments/assessment1.3.html" frameborder="0"></iframe>'
            }, {
                id: 'assess',
                type: 'snap1',
                name: 'Task_1.3',
                template: {
                    user: 'Naveed',
                    proj: 'Module1_3.2'
                }
            }]
        };
    } else if (id === '1d-stop') {
        res = {
            parent: {
                id: '1dmotion',
                name: '1D: Land'
            },
            id: id,
            name: 'Model Building -1D Acceleration: Make Your Truck Stop',
            tabs: [{
                id: 'desc',
                type: 'desc',
                name: 'Description',
                markup: '<iframe id=desc_resourceIframe  src="task-descriptions/1D-module/1D-truck_stop.html" frameborder="0"></iframe>'
            }, {
                id: 'truckStop',
                type: 'cm',
                name: 'PLAN',
                data: 'sf_stop_truck'
            }, {
                id: 'stopAccel',
                type: 'snap1',
                name: 'BUILD',
                template: {
                    user: 'nicole',
                    proj: 'sf_stop_truck'
                }
            }, {
                id: 'resource',
                type: 'desc',
                name: 'Resources',
                markup: '<iframe id=desc_resourceIframe  src="resources.html" frameborder="0"></iframe>'
            }]
        };
    }/*else if (id === '1d-checkin4') {
        res = {
            parent: {
                id: '1dmotion',
                name: '1D: Land'
            },
            id: id,
            name: 'Check-In #4',
            tabs: [{
                id: 'assessment',
                type: 'desc',
                name: 'Assessment',
                markup: '<iframe id=desc_resourceIframe  src="assessment1.1.html" frameborder="0"></iframe>'
            }]
        };
    }*/else if (id === '1d-deliver') {
        res = {
            parent: {
                id: '1dmotion',
                name: '1D: Land'
            },
            id: id,
            name: 'Challenge Problem: Deliver the Medicine to the River!',
            tabs: [{
                id: 'desc',
                type: 'desc',
                name: 'Description',
                markup: '<iframe id=desc_resourceIframe  src="task-descriptions/1D-module/1D-deliver.html" frameborder="0"></iframe>'
            },   {
                id: 'Challengecm',
                type: 'cm',
                name: 'PLAN',
                data: 'sf_land_challenge'
            }, {
                id: 'Challengecomp',
                type: 'snap1',
                name: 'BUILD',
                template: {
                    user: 'nicole',
                    proj: 'sf_land_challenge'
                }
            }, {
                id: 'resource',
                type: 'desc',
                name: 'Resources',
                markup: '<iframe id=desc_resourceIframe  src="resources.html" frameborder="0"></iframe>'
            }]
        };
    } else if (id === '2d-basics') {
        res = {
            parent: {
                id: 'm2',
                name: '2D: Water'
            },
            id: id,
            name: 'Instructional Task: Motion of Boat in a River',
            tabs: [{
                id: 'desc',
                type: 'desc',
                name: 'Description',
                markup:'<iframe id=desc_resourceIframe  src="task-descriptions/2D-module/2d-motion_of_boat.html" frameborder="0"></iframe>'
            }, {
                id: 'planinstboat',
                type: 'cm',
                name: 'PLAN',
                data: '2d_inst_boat'
            }, {
                id: 'motionboat',
                type: 'snap1',
                name: 'BUILD',
                template: {
                    user: 'nicole',
                    proj: 'sf2d-motion_of_boat'
                }
            }, {
                id: 'resource',
                type: 'desc',
                name: 'Resources',
                markup: '<iframe id=desc_resourceIframe  src="resources.html" frameborder="0"></iframe>'
            }]
        };
    } else if (id === '2d-inst_cross') {
        res = {
            parent: {
                id: 'm2',
                name: '2D: Water'
            },
            id: id,
            name: 'Instructional Task: Crossing the River',
            tabs: [{
                id: 'desc',
                type: 'desc',
                name: 'Description',
                markup: '<iframe id=desc_resourceIframe  src="task-descriptions/2D-module/2d-inst_crossing_river.html" frameborder="0"></iframe>'
            }, {
                id: 'planinstcross',
                type: 'cm',
                name: 'PLAN',
                data: '2d_inst_cross'
            }, {
                id: 'instcross',
                type: 'snap1',
                name: 'BUILD',
                template: {
                    user: 'nicole',
                    proj: 'sf2d-inst_cross'
                }
            }, {
                id: 'resource',
                type: 'desc',
                name: 'Resources',
                markup: '<iframe id=desc_resourceIframe  src="resources.html" frameborder="0"></iframe>'
            }]
        };
    }else if (id === '2d-checkin1') {
        res = {
            parent: {
                id: 'm2',
                name: '2D: Water'
            },
            id: id,
            name: 'Check-In #1',
            tabs: [{
                id: 'assessment',
                type: 'desc',
                name: 'Assessment',
                markup: '<iframe id=desc_resourceIframe  src="assessments/assessment2.1.html" frameborder="0"></iframe>'
            }, {
                id: 'assess',
                type: 'snap1',
                name: 'Task_2.1',
                template: {
                    user: 'satabdi27',
                    proj: 'AirportTask'
                }
            }]
        };
    } else if (id === '2d-mb_cross') {
        res = {
            parent: {
                id: 'm2',
                name: '2D: Water'
            },
            id: id,
            name: 'Model Building - Crossing the River to Get to the Airstrip',
            tabs: [{
                id: 'desc',
                type: 'desc',
                name: 'Description',
                markup: '<iframe id=desc_resourceIframe  src="task-descriptions/2D-module/2d-mb_crossing_river.html" frameborder="0"></iframe>'
            }, {
                id: 'plancrossing',
                type: 'cm',
                name: 'PLAN',
                data: '2d_cross_river'
            }, {
                id: 'buildcrossing',
                type: 'snap1',
                name: 'BUILD',
                template: {
                    user: 'nicole',
                    proj: 'sf2d-mb_cross'
                }
            }, {
                id: 'resource',
                type: 'desc',
                name: 'Resources',
                markup: '<iframe id=desc_resourceIframe  src="resources.html" frameborder="0"></iframe>'
            }]
        };
    }else if (id === '2d-checkin2') {
        res = {
            parent: {
                id: 'm2',
                name: '2D: Water'
            },
            id: id,
            name: 'Check-In #2',
            tabs: [{
                id: 'assessment',
                type: 'desc',
                name: 'Assessment',
                markup: '<iframe id=desc_resourceIframe  src="assessments/assessment2.2.html" frameborder="0"></iframe>'
            }]
        };
    }else if (id === '2d-river_challenge') {
        res = {
            parent: {
                id: 'm2',
                name: '2D: Water'
            },
            id: id,
            name: 'Challenge Problem: Deliver the Medicine to the River!',
            tabs: [{
                id: 'desc',
                type: 'desc',
                name: 'Description',
                markup: '<iframe id=desc_resourceIframe  src="task-descriptions/2D-module/2d-challenge.html" frameborder="0"></iframe>'
            },   {
                id: 'planriverchallenge',
                type: 'cm',
                name: 'PLAN',
                data: '2d_river_challenge'
            }, {
                id: 'buildriverchallenge',
                type: 'snap1',
                name: 'BUILD',
                template: {
                    user: 'nicole',
                    proj: 'sf2d-river_crossing'
                }
            }, {
                id: 'resource',
                type: 'desc',
                name: 'Resources',
                markup: '<iframe id=desc_resourceIframe  src="resources.html" frameborder="0"></iframe>'
            }]
        };
    } else if (id === 'air-basics') {
        res = {
            parent: {
                id: 'm3',
                name: '2D: Air'
            },
            id: id,
            name: 'Instructional Task: Ready, Aim → Drop',
            tabs: [{
                id: 'desc',
                type: 'desc',
                name: 'Description',
                markup:'<iframe id=desc_resourceIframe  src="task-descriptions/2D-air-module/air-drop_package.html" frameborder="0"></iframe>'
            }, {
                id: 'planairdrop',
                type: 'cm',
                name: 'PLAN',
                data: 'air_inst_drop'
            }, {
                id: 'airbasic',
                type: 'snap1',
                name: 'BUILD',
                template: {
                    user: 'nicole',
                    proj: 'sfair-drop_package'
                }
            }, {
                id: 'resource',
                type: 'desc',
                name: 'Resources',
                markup: '<iframe id=desc_resourceIframe  src="resources.html" frameborder="0"></iframe>'
            }]
        };
    } else if (id === 'air-inst_drop') {
        res = {
            parent: {
                id: 'm3',
                name: '2D: Air'
            },
            id: id,
            name: 'Instructional Task: Drop While Moving!',
            tabs: [{
                id: 'desc',
                type: 'desc',
                name: 'Description',
                markup: '<iframe id=desc_resourceIframe  src="task-descriptions/2D-air-module/air-move_drone.html" frameborder="0"></iframe>'
            }, {
                id: 'planinstmoving',
                type: 'cm',
                name: 'PLAN',
                data: 'air_inst_moving'
            }, {
                id: 'instdrop',
                type: 'snap1',
                name: 'BUILD',
                template: {
                    user: 'nicole',
                    proj: 'sfair-move_drone'
                }
            }, {
                id: 'resource',
                type: 'desc',
                name: 'Resources',
                markup: '<iframe id=desc_resourceIframe  src="resources.html" frameborder="0"></iframe>'
            }]
        };
    }else if (id === 'air-checkin1') {
        res = {
            parent: {
                id: 'm3',
                name: '2D: Air'
            },
            id: id,
            name: 'Check-In #1',
            tabs: [{
                id: 'assessment',
                type: 'desc',
                name: 'Assessment',
                markup: '<iframe id=desc_resourceIframe  src="assessments/assessment3.1.html" frameborder="0"></iframe>'
            },{
                id: 'assess',
                type: 'snap1',
                name: 'Task_3.1',
                template: {
                    user: 'satabdi27',
                    proj: 'Module3_1.2'
                }
            }]
        };
    } else if (id === 'air-mb_drop') {
        res = {
            parent: {
                id: 'm3',
                name: '2D: Air'
            },
            id: id,
            name: 'Model Building - Two Moving Drops at Different Altitudes!',
            tabs: [{
                id: 'desc',
                type: 'desc',
                name: 'Description',
                markup: '<iframe id=desc_resourceIframe  src="task-descriptions/2D-air-module/air-drop_moving.html" frameborder="0"></iframe>'
            }, {
                id: 'planairmb',
                type: 'cm',
                name: 'PLAN',
                data: 'air_drop_moving'
            }, {
                id: 'buildairmb',
                type: 'snap1',
                name: 'BUILD',
                template: {
                    user: 'nicole',
                    proj: 'sfair-drop_moving'
                }
            }, {
                id: 'resource',
                type: 'desc',
                name: 'Resources',
                markup: '<iframe id=desc_resourceIframe  src="resources.html" frameborder="0"></iframe>'
            }]
        };
    }else if (id === 'air-checkin2') {
        res = {
            parent: {
                id: 'm3',
                name: '2D: Air'
            },
            id: id,
            name: 'Check-In #2',
            tabs: [{
                id: 'assessment',
                type: 'desc',
                name: 'Assessment',
                markup: '<iframe id=desc_resourceIframe  src="assessments/assessment3.2.html" frameborder="0"></iframe>'
            },{
                id: 'assess',
                type: 'snap1',
                name: 'Task_3.2',
                template: {
                    user: 'satabdi27',
                    proj: 'Module3_2.1'
                }
            }]
        };
    }else if (id === 'air-challenge') {
        res = {
            parent: {
                id: 'm3',
                name: '2D: Air'
            },
            id: id,
            name: 'Challenge Problem: Moving on Up!',
            tabs: [{
                id: 'desc',
                type: 'desc',
                name: 'Description',
                markup: '<iframe id=desc_resourceIframe  src="task-descriptions/2D-air-module/air-challenge.html" frameborder="0"></iframe>'
            },   {
                id: 'planairchallenge',
                type: 'cm',
                name: 'PLAN',
                data: 'air_challenge'
            }, {
                id: 'buildairchallenge',
                type: 'snap1',
                name: 'BUILD',
                template: {
                    user: 'nicole',
                    proj: 'sfair-challenge'
                }
            }, {
                id: 'resource',
                type: 'desc',
                name: 'Resources',
                markup: '<iframe id=desc_resourceIframe  src="resources.html" frameborder="0"></iframe>'
            }]
        };
    }else if (id === 'para-challenge') {
        res = {
            parent: {
                id: 'm4',
                name: 'Challenge'
            },
            id: id,
            name: 'Challenge Problem: Parachute Drop!',
            tabs: [{
                id: 'desc',
                type: 'desc',
                name: 'Description',
                markup: '<iframe id=desc_resourceIframe  src="task-descriptions/challenge/para-challenge.html" frameborder="0"></iframe>'
            },   {
                id: 'planfinalchallenge',
                type: 'cm',
                name: 'PLAN',
                data: 'para_challenge'
            }, {
                id: 'buildfinalchallenge',
                type: 'snap1',
                name: 'BUILD',
                template: {
                    user: 'nicole',
                    proj: 'sfpara-challenge'
                }
            }, {
                id: 'resource',
                type: 'desc',
                name: 'Resources',
                markup: '<iframe id=desc_resourceIframe  src="resources.html" frameborder="0"></iframe>'
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
    if (callback) {
        // hack, to make sure that we are logged in
        this.login(null, null, null, function (err) {
            callback(err, err ? null : res);
        });
    } else {
        return res;
    }
}
