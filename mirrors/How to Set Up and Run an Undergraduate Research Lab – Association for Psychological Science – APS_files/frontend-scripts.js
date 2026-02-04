jQuery(document).ready(function($) {
    // Handle tab switching
    $('.search-tab').on('click', function(e) {
        e.preventDefault();
        var target = $(this).data('target');
        
        // Hide all search forms
        $('.search-form').hide();
        // Show the selected search form
        $('#' + target).show();

        // --- NEW: toggle results panes to match the tab ---
        // Convention: form ids end with "-search", results end with "-results"
        $('.results-pane').hide();
        var resultsTarget = target.replace('-search', '-results');
        $('#' + resultsTarget).show();

        // --- NEW: set the hidden active_tab field in all forms ---
        $('input[name="active_tab"]').val(resultsTarget);

        // Update active tab style
        $('.search-tab').removeClass('active');
        $(this).addClass('active');
    });
});
