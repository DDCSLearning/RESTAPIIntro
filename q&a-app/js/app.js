(function() {

  /* *  State & Route Helpers  * */

  // is an answer currently being edited?
  var answerEditing = false;

  // this reference will be used to hold the current data
  var model;

  // object to help build routes to call on the REST API
  // change the baseUrl for your setup
  var routes = {
    baseUrl: 'http://localhost:3000/questions',
    questions: function() {
      return this.baseUrl
    },
    question: function(config) {
      return this.questions() + '/' + config.qID
    },
    answers: function(config) {
      return this.question(config) + '/answers'
    },
    answer: function(config) {
      return this.answers(config) + '/' + config.aID
    },
    vote: function(config) {
      return this.answer(config) + '/vote-' + config.vote
    }
  }

  /* *  View  * */

  var view = {

    // an object to hold the precompiled handlebars templates
    templates: {},

    // help with date display
    templateHelpers: {
      indexDateFormat: function(dStr) {
        return moment(dStr).format('MMMM Do, YYYY')
      },
      questionDateFormat: function(dStr) {
        return moment(dStr).format('MMMM Do, YYYY h:mm a')
      }
    },

    // this method launches the view
    init: function(config) {
      
      // set a default view
      this.$view = $(config.defaultView);

      // store handlebars templates
      this.templates.index = Handlebars.templates.index;
      this.templates.question = Handlebars.templates.question;
      this.templates.q_partial = Handlebars.partials.q_partial;
      this.templates.a_partial = Handlebars.partials.a_partial;
      this.templates.answerEditForm = Handlebars.partials.answer_edit_form;

      Handlebars.registerHelper('indexDateFormat', this.templateHelpers.indexDateFormat);
      Handlebars.registerHelper('questionDateFormat', this.templateHelpers.questionDateFormat);
    },

    // this method supplies success handlers to ajax calls the app makes
    changeHandler: function(config) {

      // return the configured handler
      return function(data) {

        // store new data in case it needs to be referenced
        model = data;

        // use the default view unless another is supplied
        var $view = config.altView
          ? $(config.altView)
          : this.$view;

        // check whether answer is currently being edited, set appropriately
        if (typeof config.answerEditing == 'boolean') {
          answerEditing = config.answerEditing;
        }

        // we need a template
        if (!config.template) throw 'no template supplied for view';

        // handle index template which requires data to be in obj
        data = config.template == 'index' ? {data:data} : data;

        // allow a function to be passed in for template, pass it data
        // otherwise lookup template with provided name and compile with data
        var comp, content;
        if (typeof config.template == 'function') {
          config.template.call(this, data);
          content = $view.html();
        } else {
          comp = this.templates[config.template](data);
          $view.html(comp);
          content = comp;
        }

        // manage the page history as required
        manageHistory({
          changePage:config.changePage,
          content:content,
          url:config.url
        })

        // execute any special cleanup, supplied as a function
        if (config.specialCleanup) config.specialCleanup();
      }.bind(this); // <- bind to view because $.ajax will execute 
                    //    the handler in its own context otherwise
    }
  };

  // checks whether a new browser page should be created with current action
  var manageHistory = function(config) {
    if (config.changePage) {
      history.pushState(config.content, '', config.url);
    } else {
      history.replaceState(config.content, '', config.url);
    }
  }

  /* *  Event Handlers  * */

  var initApp = function() {

    // initialize view, pass it a jquery selector to be used for default view
    view.init({ defaultView: '.bounds' });

    // first thing, let's look at the URL to see if we'll need to do some routing
    if (location && location.search) {

      // take off the '?'
      var queryString = location.search.replace(/^\?/, '');

      // handle multiple arguments, reject all but 'id'
      var queryStringArr = queryString.split('&').filter(function(q) {
        return q.search(/^id=/) > -1;
      });

      // if after that we have a qualifying query string, get the id
      if (queryStringArr.length == 1) {
        var queryStringPieces = queryStringArr[0].split('=');
        var id = queryStringPieces[1];

        // call showQuestion
        var initFlag = 'init';
        showQuestion.call({questionId:id}, initFlag);
        return;
      }
    }

    //default action
    showQuestions('init');
  }

  var showQuestions = function(e) {
    if (typeof e == 'object') e.preventDefault();
    $.ajax({
      url: routes.questions(),
      method: 'GET',
      success: view.changeHandler({
        answerEditing: false,
        template: 'index',
        changePage: typeof e == 'object',
        url: '/'
      })
    });
  }

  var showQuestion = function(e) {
    if (typeof e == 'object') e.preventDefault();

    // look for questionId property, 
    // otherwise this was triggered by user event
    var id = this.questionId || $(this).attr('data-id');
    $.ajax({
      url: routes.question({qID:id}),
      method: 'GET',
      success: view.changeHandler({
        template: 'question',
        changePage: typeof e == 'object',
        url: '?id=' + id
      }),
      error: function(jqXHR, status) {
        showHomePage();
      }
    })
  }

  var submitQuestion = function(e) {
    e.preventDefault();
    var $input = $(e.target).prev();
    var text = $input.val();
    $.ajax({
      url: routes.questions(),
      method: 'POST',
      data: JSON.stringify({text:text}),
      contentType:'application/json',
      success: view.changeHandler({

        // submit a template function since the DOM needs 
        // to be manipulated in a non-standard way
        template: function(data) {
          var comp = this.templates.q_partial(data);
          $('.grid-parent.question:first').before(comp);
        },

        // clear input field
        specialCleanup: function() {
          $input.val('');
        }
      })
    });
  }

  var submitAnswer = function(e) {
    e.preventDefault();
    if (answerEditing) return;
    var text = $(e.target).prev().val();
    $.ajax({
      url: routes.answers({ qID: model._id }),
      method: 'POST',
      data: JSON.stringify({text:text}),
      contentType:'application/json',
      success: view.changeHandler({
        template: 'question'
      })
    })
  }

  var editAnswer = function(e) {
    e.preventDefault();
    if(answerEditing) return;
    answerEditing = true;
    var $link = $(e.target);
    var text = $link.html();
    var comp = view.templates.answerEditForm({text:text});
    $link.replaceWith(comp);
  }

  var submitAnswerEdits = function(e) {
    e.stopPropagation();
    e.preventDefault();
    var $answer = $(e.target).parents('.answer-container');
    var aID = $answer.attr('data-id');
    var text = $answer.find('textarea').val();
    $.ajax({
      url: routes.answer({
        qID: model._id,
        aID: aID
      }),
      method: 'PUT',
      data: JSON.stringify({text:text}),
      contentType: 'application/json',
      success: view.changeHandler({
        template: 'question',
        answerEditing: false
      })
    });
  };

  var cancelAnswerEdits = function(e) {
    e.stopPropagation();
    e.preventDefault();
    var $answer = $(e.target).parents('.answer-container');
    var aID = $answer.attr('data-id');
    var answer = model.answers.filter(function(a) {
      return a._id === aID;
    })[0];
    var comp = view.templates.a_partial(answer);
    $answer.next().remove();
    $answer.replaceWith(comp);
    answerEditing = false;
  };

  var deleteAnswer = function(e) {
    e.stopPropagation();
    e.preventDefault();
    var $answer = $(e.target).parents('.answer-container');
    var aID = $answer.attr('data-id');
    $.ajax({
      url: routes.answer({
        aID: aID,
        qID: model._id
      }),
      method: 'DELETE',
      success: view.changeHandler({
        answerEditing:false,
        template:'question'
      })
    })
  };

  var voteAnswer = function(e) {
    if(answerEditing) return;
    var $ans = $(this);
    var direction = $ans.attr('class').match(/up|down/)[0];
    $.ajax({
      url: routes.vote({
        qID: model._id,
        aID: $ans.parents('.answer-container').attr('data-id'),
        vote: direction
      }),
      method: 'POST',
      success: view.changeHandler({
        template:'question'
      })
    })
  }

  /* *  Onload  * */

  $(function() {
    
    // Initial load
    initApp();

    // Set up handlers
    $('.main-logo').on('click', showQuestions);

    var $container = $('.bounds');
    $container.on('click', 'input.question', submitQuestion);
    $container.on('click', '.question a', showQuestion);
    $container.on('click', '.answer-voting span', voteAnswer);
    $container.on('click', '.answer-container a', editAnswer);
    $container.on('click', 'input.answer', submitAnswer);
    $container.on('click', '#editAnswerSubmit', submitAnswerEdits);
    $container.on('click', '#editAnswerCancel', cancelAnswerEdits);
    $container.on('click', '#editAnswerDelete', deleteAnswer);

    window.onpopstate = function(event) {
      $('.bounds').html(event.state);
    };
  });

})()