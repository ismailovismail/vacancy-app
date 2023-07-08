import { FlowRouter } from 'meteor/ostrio:flow-router-extra'


// components
import '../../ui/components/navigation/navigation'

// pages
import '../../ui/pages/users/login'
import '../../ui/pages/users/register'
import '../../ui/pages/users/forgetPassword'
import '../../ui/pages/vacancies/vacancies'
import '../../ui/pages/users/resetPassword'
import '../../ui/pages/admin/users'
import '../../ui/pages/admin/usersEdit'
import '../../ui/pages/admin/adminVacancies'
import '../../ui/pages/admin/addVacancy'
import '../../ui/pages/admin/editVacancy'
import '../../ui/pages/vacancies/vacanciesDetail'
import '../../ui/pages/vacancies/appliedVacancies'
import '../../ui/pages/users/userProfile'
import '../../ui/pages/vacancies/appliedVacancyDetail'
import '../../ui/pages/admin/adminAppliedVacancies'
import '../../ui/pages/admin/adminAppVacancyDetail'
import '../../ui/pages/users/changePassword'

// layouts
import '../../ui/layouts/auth/authLayout'
import '../../ui/layouts/main/mainLayout'
import '../../ui/layouts/admin/adminLayout'


FlowRouter.triggers.enter([trackRouteEntry], {
    only: ['home', 'users', 'adminVacancies', 'editVacancy', 'addVacancy', 'usersEdit', 'vacanciesDetail', 'appliedVacancies', 'userProfile', 'appliedVacancyDetail', 'adminAppliedVacancies', 'adminAppliedVacancyDetail', 'changePassword']
})
FlowRouter.triggers.enter([trackRouteNotEntry], {
    only: ['users', 'adminVacancies', 'editVacancy', 'addVacancy', 'usersEdit', 'adminAppliedVacancies', 'adminAppliedVacancyDetail']
})
FlowRouter.triggers.enter([trackRouteEntry2], {
    only: ['resetPassword', 'login', 'register', 'forgetPassword',]
})



FlowRouter.route('/', {
    name: 'home',
    action() {
        BlazeLayout.render('mainLayout', {
            main: 'home'
        })
    }
})

FlowRouter.route('/vacancies/:_id', {
    name: 'vacanciesDetail',
    action() {
        BlazeLayout.render('mainLayout', {
            main: 'vacanciesDetail'
        })
    }
})

FlowRouter.route('/applied-vacancies', {
    name: 'appliedVacancies',
    action() {
        BlazeLayout.render('mainLayout', {
            main: 'appliedVacancies'
        })
    }
})


FlowRouter.route('/applied-vacancies/:vacancyId', {
    name: 'appliedVacancyDetail',
    action() {
        BlazeLayout.render('mainLayout', {
            main: 'appliedVacancyDetail'
        })
    }
})

FlowRouter.route('/user-profile', {
    name: 'userProfile',
    action() {
        BlazeLayout.render('mainLayout', {
            main: 'userProfile'
        })
    }
})


FlowRouter.route('/change-password', {
    name: 'changePassword',
    action() {
        BlazeLayout.render('mainLayout', {
            main: 'changePassword'
        })
    }
})


FlowRouter.route('/reset-password/:_link', {
    name: 'resetPassword',
    action() {
        BlazeLayout.render('authLayout', {
            main: 'resetPassword'
        })
    }
})



FlowRouter.route('/login', {
    name: 'login',
    action() {
        BlazeLayout.render('authLayout', {
            main: 'login'
        })
    }
})



FlowRouter.route('/register', {
    name: 'register',
    action() {
        BlazeLayout.render('authLayout', {
            main: 'register'
        })
    }
})


FlowRouter.route('/forget-password', {
    name: 'forgetPassword',
    action() {
        BlazeLayout.render('authLayout', {
            main: 'forgetPassword'
        })
    }
})

FlowRouter.route('/admin/users', {
    name: 'users',
    action() {
        BlazeLayout.render('adminLayout', {
            main: 'users'
        })
    }

})


FlowRouter.route('/admin/applied-vacancies', {
    name: 'adminAppliedVacancies',
    action() {
        BlazeLayout.render('adminLayout', {
            main: 'adminAppliedVacancies'
        })
    }

})


FlowRouter.route('/admin/applied-vacancies/:_id', {
    name: 'adminAppVacancyDetail',
    action() {
        BlazeLayout.render('adminLayout', {
            main: 'adminAppVacancyDetail'
        })
    }

})


FlowRouter.route('/admin/vacancies', {
    name: 'adminVacancies',
    action() {
        BlazeLayout.render('adminLayout', {
            main: 'adminVacancies'
        })
    }

})

FlowRouter.route('/admin/vacancies/:_id', {
    name: 'editVacancy',
    action() {
        BlazeLayout.render('adminLayout', {
            main: 'editVacancy'
        })
    }

})

FlowRouter.route('/admin/add-vacancy', {
    name: 'addVacancy',
    action() {
        BlazeLayout.render('adminLayout', {
            main: 'addVacancy'
        })
    }

})

FlowRouter.route('/admin/users/:_id', {
    name: 'usersEdit',
    action() {
        BlazeLayout.render('adminLayout', {
            main: 'usersEdit'
        })
    }
})


function trackRouteEntry(context, redirect) {
    if (!Meteor.userId() && !Meteor.loggingIn()) {
        redirect('/login')
    }
}

function trackRouteNotEntry(context, redirect) {
    if (Meteor.userId() && Meteor?.loggingIn()) {
        redirect('/')
    }
}

function trackRouteEntry2(context, redirect) {
    if (Meteor.userId() && Meteor.loggingIn()) {
        redirect('/')
    }
}