// Generated by LiveScript 1.2.0
(function(){
  var convertFbContent, registerObserver, main;
  convertFbContent = function(){
    if (window.location.pathname.indexOf('tsaichengyuan') === -1) {
      return;
    }
    return $('.userContentWrapper').each(function(idx, wrapper){
      var link, moreText, userContent, innerDiv, ref$;
      if (!$(wrapper).hasClass('normalized')) {
        link = $(wrapper).find('.see_more_link');
        if (link[0]) {
          link[0].click();
        }
        $(wrapper).find('.text_exposed_hide').remove();
        moreText = $(wrapper).find('.text_exposed_show');
        userContent = $(wrapper).find('.userContent');
        innerDiv = $(userContent).find('div');
        if (innerDiv[0]) {
          userContent[0].innerHTML += innerDiv[0].innerHTML;
        }
        $(userContent).find('div').remove();
        if (moreText[0]) {
          userContent[0].innerHTML += moreText[0].innerHTML;
        }
        $(wrapper).find('.text_exposed_show').remove();
        (ref$ = userContent[0]).innerHTML = ref$.innerHTML.replace(/<br>\ /g, '<br>');
        (ref$ = userContent[0]).innerHTML = ref$.innerHTML.replace(/<br>/g, '\n');
        $(userContent).convertFromCY();
        return $(wrapper).addClass('normalized');
      }
    });
  };
  registerObserver = function(){
    var MutationObserver, throttle, mutationObserver;
    MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    throttle = function(){
      var timer_;
      return function(fn, wait){
        if (timer_) {
          clearTimeout(timer_);
        }
        return timer_ = setTimeout(fn, wait);
      };
    }();
    mutationObserver = new MutationObserver(function(mutations){
      var hasNewNode;
      hasNewNode = false;
      mutations.forEach(function(mutation, idx){
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          return hasNewNode = true;
        }
      });
      if (hasNewNode) {
        return throttle(function(){
          return convertFbContent(document);
        }, 1000);
      }
    });
    return mutationObserver.observe(document, {
      attributes: true,
      childList: true,
      characterData: true,
      subtree: true
    });
  };
  main = function(){
    var target;
    target = document.getElementById('contentArea') || document.getElementById('content');
    if (!target) {
      return console.error('止兀表示: 臉書有問題啦！(╯-_-)╯ ~╩╩ ');
    }
    if (window.location.pathname.indexOf('tsaichengyuan') === -1) {
      $('.uiTextareaAutogrow').on('change', function(it){
        return $(it.target).convertToCY();
      });
      return $(document).on('change', '.uiTextareaAutogrow', function(it){
        return $(it.target).convertToCY();
      });
    } else {
      convertFbContent(target);
      return registerObserver();
    }
  };
  main();
}).call(this);
