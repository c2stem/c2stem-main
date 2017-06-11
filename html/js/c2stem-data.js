C2Stem.prototype.loadHomeData = function (callback) {
    var res = {
        modules: [{
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
            icon: "img/plane.png"
        }, {
            id: 'm4',
            name: "Gravity",
            icon: "img/falcon9.png"
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
            name: '1D: Land',
            tasks: [{
                id: '1d-basics',
                name: 'Instructional Task - Develop Simple Motion Simulation'
            }, {
                id: '1d-elaborate',
                name: 'Instructional Task - 1D Velocity: Elaborate Your Simulation'
            }, {
                id: '1d-inst_conceptual',
                name: 'Instructional Task - 1D Velocity: Model Planning'
            }, {
                id: '1d-constant',
                name: 'Model Building - 1D Velocity: Simulate the Motion of a Truck'
            }, {
                id: '1d-liftoff',
                name: 'Instructional Task - 1D Acceleration: Changing Velocity'
            }, {
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
                id: '2d-mb_cross',
                name: 'Model Building - Crossing the River to Get to the Airstrip'
            }, {
                id: '2d-river_challenge',
                name: 'Challenge: The Uncertain Amazon River'
            }, {
                id: '2d-assessment',
                name: 'Assessment Task'
            }]
        };
    } else if (id === 'm3') {
        res = {
            id: id,
            name: '2D: Air',
            tasks: [{
                id: 'para-basics',
                name: 'Instructional Task: Drop'
            }, {
                id: 'para-inst_drop',
                name: 'Instructional Task: Drop While Moving'
            }, {
                id: 'para-mb_drop',
                name: 'Model Building - Drop Package on Target'
            }, {
                id: 'para-plane_challenge',
                name: 'Challenge: Final Delivery of the Medicine!'
            }, {
                id: 'para-assessment',
                name: 'Assessment Task'
            }]
        };
    } else if (id === 'm4') {
        res = {
            id: id,
            name: 'Gravity',
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
            name: 'Instructional Task - 1D Velocity: Elaborate Your Simulation',
            tabs: [{
                id: 'desc',
                type: 'desc',
                name: 'Description',
                markup: '<iframe id=desc_resourceIframe  src="task-descriptions/1D-module/1D-elaborate_your_simulation.html" frameborder="0"></iframe>'
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
                markup: '<iframe id=desc_resourceIframe  src="task-descriptions/1D-module/1D-introduction_to_acceleration.html" frameborder="0"></iframe>'
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
    }else if (id === '1d-deliver') {
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
    }else if (id === '1d-assessment') {
        res = {
            parent: {
                id: '1dmotion',
                name: '1D: Land'
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
                id: 'relativeassess',
                type: 'desc',
                name: 'LEARN',
                markup: '<iframe id=desc_resourceIframe  src="assessment.html" frameborder="0"></iframe>'
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
    }else if (id === '2d-assessment') {
        res = {
            parent: {
                id: 'm2',
                name: '2D: Water'
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
