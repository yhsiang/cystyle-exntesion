convert-fb-content = ->
  #$ baseNode
  $ '.userContentWrapper'
    .each (idx, wrapper) ->
      unless $ wrapper .hasClass 'normalized'
        link = $ wrapper .find '.see_more_link'
        link.0.click! if link.0
        $ wrapper .find '.text_exposed_hide' .remove!
        more-text = $ wrapper .find '.text_exposed_show'
        userContent = $ wrapper .find '.userContent'
        innerDiv = $ userContent .find 'div'
        userContent.0.innerHTML += innerDiv.0.innerHTML if innerDiv.0
        $ userContent .find 'div' .remove!
        userContent.0.innerHTML +=  more-text.0.innerHTML if more-text.0
        $ wrapper .find '.text_exposed_show' .remove!
        userContent.0.innerHTML .= replace /<br>\ /g '<br>'
        userContent.0.innerHTML .= replace /<br>/g '\n'
        $ userContent .convertFromCY!
        $ wrapper .addClass 'normalized'

registerObserver = ->
  MutationObserver = window.MutationObserver || window.WebKitMutationObserver

  throttle = (->
    var timer_
    (fn, wait) ->
      clearTimeout timer_ if timer_
      timer_ := setTimeout fn, wait
  )!
  #target = document
  mutationObserver = new MutationObserver (mutations) ->
    hasNewNode = false
    mutations.forEach (mutation, idx) ->
      #mutation |> console.log
      #console.log mutation.addedNodes if mutation.type is 'childList' and mutation.addedNodes.length > 0
      hasNewNode := true if mutation.type is 'childList' and mutation.addedNodes.length > 0

    (-> convert-fb-content document) `throttle` 1000 if hasNewNode

  mutationObserver.observe document, do
    attributes: true
    childList: true
    characterData: true
    subtree: true

main = ->
  target = document.getElementById 'contentArea' or document.getElementById 'content'
  return console.error '止兀表示: 臉書有問題啦！(╯-_-)╯ ~╩╩ ' unless target
  convert-fb-content target
  registerObserver!
main!