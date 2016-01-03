$(function(){
  
  var counter = (function() {
    var count = 0;
    
    return {
      increment: function() {
        return ++count;
      },
      reset: function() {
        count = 0;
      },
      getCount: function() {
        return count;
      } 
    };
  })();
  
  var timer = (function() {
    var time = 0;
    var timeInterval;
    
    function reset() {
      time = 60;
    }
    
    function init() {
      reset();
    }
    
    function decrement() {
      --time;
    }
    
    function getTime() {
      return time;
    }
    
    init();
    
    return {
      reset: reset,
      decrement: decrement,
      getTime: getTime,
      startCountdown: function(callback) {
        timeInterval = setInterval(function(){
          decrement();
          callback();
          if (getTime() == 0) {
            clearInterval(timeInterval);
          }
        }, 1000);
      }
    };
  })();
  
  var little = (function(){
    var l;
    var lambda;
    var w;
    var w_m;
    var w_s;
    
    return {
      waitingTime: function(_l, _lambda) {
        l = _l;
        lambda = _lambda;
        w = l / lambda;
        w_m = Math.floor(w);
        w_s = Math.ceil((w - w_m) * 60);
      },
      getWatingTimeMinute: function() {
        return w_m;
      },
      getWatingTimeSecond: function() {
        return w_s;
      }
    };
    
  })();
  
  var waitingApp = (function($) {
    var counter = null;
    var timer = null;
    var little = null;
    
    function updateTimerText() {
      $('#countdown').text(timer.getTime());
    }
    
    function updateCountText() {
      $('#count').text(counter.getCount());
    }
    
    function updateWaitingTimeText() {
      little.waitingTime(
        $('#l').val(),
        $('#count').text()
      ); 
      var waiting = "待ち時間は";
      if (0 < little.getWatingTimeMinute()) {
        waiting += little.getWatingTimeMinute() + "分"; 
      }
      if (0 < little.getWatingTimeSecond()) {
        waiting += little.getWatingTimeSecond() + "秒";
      }
      $('#waiting #time').text(waiting);
    }
    
    $('#count').on('change', function(){
      updateWaitingTimeText();
    });
    
    $('#l').on('keyup', function(){
      $('#startBtn').prop('disabled', false);  
    });
    
    $('#startBtn').click(function(e){
      $('#plusBtn').prop('disabled', false).removeClass('btn-default').addClass('btn-primary');  
      timer.startCountdown(updateTimerText);
    });
    
    $('#plusBtn').click(function(e){
      counter.increment();
      updateCountText();
      updateWaitingTimeText();
    });
    
    return {
      init: function(_counter, _timer, _little) {
        counter = _counter;
        timer = _timer;
        little = _little;
        
        updateCountText();
      }
    };
  })(jQuery);
  
  waitingApp.init(counter, timer, little);  
});