from pyLibrary.debugs.logs import Log
from pyLibrary.strings import expand_template

_using_mozlog = False

def use_mozlog():
    """
    USE AN INSTANCE OF mozlog.structured.structuredlog.StructuredLogger
    INSTEAD OF THE pyLibrary STANDARD
    THE HOPE IS Log IS REPLACED BY ToMozLog EVERYWHERE
    """

    if _using_mozlog:
        return

    globals()["_using_mozlog"] = True
    try:
        from pyLibrary.debugs.mozlog.structured import structuredlog

        global logger
        logger = structuredlog.get_default_logger()
        ToMozLog.logger = logger
        ToMozLog.old_class = Log
        globals()["Log"] = ToMozLog
    except:
        pass


class ToMozLog(object):
    """
    MAP CALLS pyLibrary.debugs.logs.Log TO mozlog.structured.structuredlog.StructuredLogger
    """
    logger = None
    old_class = None

    @classmethod
    def debug(cls, template=None, params=None):
        cls.logger.debug(expand_template(template, params))

    @classmethod
    def println(cls, template, params=None):
        cls.logger.debug(expand_template(template, params))

    @classmethod
    def note(cls, template, params=None, stack_depth=0):
        cls.logger.debug(expand_template(template, params))

    @classmethod
    def unexpected(cls, template, params=None, cause=None):
        cls.logger.error(expand_template(template, params))

    @classmethod
    def warning(cls, template, params=None, *args, **kwargs):
        cls.logger.warn(expand_template(template, params))

    @classmethod
    def error(cls, template, params=None, cause=None, stack_depth=0):
        cls.logger.error(expand_template(template, params))
        cls.old_class.error(template, params, cause, stack_depth)
